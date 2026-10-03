/* ═══════════════════════════════════════════════════════════════════
   Petrus FOH — Push Notifications (client side)
   ───────────────────────────────────────────────────────────────────
   Registers the service worker, asks the user for permission, gets the
   FCM device token and stores it in Firestore (collection push_tokens)
   together with the signed-in user's email. Cloud Functions later read
   these tokens to decide who receives each notification.

   Requires: firebase-app-compat, firebase-auth-compat,
   firebase-firestore-compat, firebase-messaging-compat and auth.js
   to be loaded first (they already initialise firebase + db).

   This is a standalone layer — it does not touch viniv or any existing
   collection. It only writes to `push_tokens`.
   ═══════════════════════════════════════════════════════════════════ */

// ⚠️ PASTE YOUR VAPID KEY HERE (Firebase Console → Project Settings →
//    Cloud Messaging → Web Push certificates → Generate key pair).
//    It is a public key, safe to keep in the client.
var PETRUS_VAPID_KEY = "BNldmwYVZAyMgyin7lZsAU0yKYsEbX2dniA2aSKjmNTtkGtXv5XqwFJ2XBlPjJgsmyUGYL7IBThNN9ivZ5y5rVc";

(function () {
  // Guard: browser must support service workers + push.
  if (!('serviceWorker' in navigator) || !('Notification' in window)) {
    console.log('[push] This browser does not support notifications.');
    return;
  }
  if (typeof firebase === 'undefined' || !firebase.messaging) {
    console.log('[push] firebase-messaging SDK not loaded on this page.');
    return;
  }

  var messaging;
  try {
    messaging = firebase.messaging();
  } catch (e) {
    console.log('[push] messaging init failed:', e);
    return;
  }

  // Save (or refresh) this device's token for the given user.
  function saveToken(token, user) {
    if (!token || !user) return;
    var email = (user.email || '').toLowerCase();
    // Use the token as the document id so re-registering is idempotent.
    return db.collection('push_tokens').doc(token).set({
      token: token,
      email: email,
      displayName: user.displayName || email.split('@')[0].replace(/\./g, ' '),
      userAgent: navigator.userAgent,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true }).then(function () {
      console.log('[push] token saved for', email);
    }).catch(function (err) {
      console.log('[push] could not save token:', err.message);
    });
  }

  // Base path of the site (handles GitHub Pages subfolders like /petrus/).
  var BASE = location.pathname.replace(/[^/]*$/, ''); // e.g. "/petrus/"

  // Register the SW, request permission, fetch the token.
  // `loud` = true → show on-screen alerts (used by the manual button) so the
  // user can see exactly what failed. Silent for the automatic call.
  function enablePushFor(user, loud) {
    function say(msg) { if (loud) { try { alert(msg); } catch (e) {} } console.log('[push]', msg); }

    // Register the SW at the site base so its scope covers all pages.
    navigator.serviceWorker.register(BASE + 'firebase-messaging-sw.js', { scope: BASE })
      .then(function (registration) {
        return Notification.requestPermission().then(function (permission) {
          if (permission !== 'granted') {
            say('Notifications permission was not granted (' + permission + '). '
              + 'On iPhone: open the app from the home-screen icon, then try again.');
            return;
          }
          return messaging.getToken({
            vapidKey: PETRUS_VAPID_KEY,
            serviceWorkerRegistration: registration
          }).then(function (token) {
            if (!token) { say('No token returned by the browser.'); return; }
            return saveToken(token, user).then(function () {
              say('Notifications enabled on this device ✓');
            });
          });
        });
      })
      .catch(function (err) {
        say('Could not enable notifications: ' + (err && err.message ? err.message : err));
      });
  }

  // Foreground messages: show a lightweight in-page notification too,
  // so people see it even while actively using the app.
  try {
    messaging.onMessage(function (payload) {
      var n = (payload && payload.notification) || (payload && payload.data) || {};
      if (Notification.permission === 'granted' && n.title) {
        new Notification(n.title, { body: n.body || '', icon: 'icons/icon-192.png' });
      }
    });
  } catch (e) { /* ignore */ }

  // Wait until the user is signed in, then enable push for them.
  firebase.auth().onAuthStateChanged(function (user) {
    if (!user) return;
    if (PETRUS_VAPID_KEY === 'PASTE_YOUR_VAPID_KEY_HERE') {
      console.log('[push] VAPID key not set yet — skipping token registration.');
      return;
    }
    // Give the SW a moment, then enable (silent — no pop-ups).
    enablePushFor(user, false);
  });

  // Expose a manual trigger (the "Enable on this device" button).
  // loud = true → shows a message telling you exactly what happened.
  window.petrusEnablePush = function () {
    var user = firebase.auth().currentUser;
    if (!user) { alert('Please sign in first.'); return; }
    enablePushFor(user, true);
  };
})();
