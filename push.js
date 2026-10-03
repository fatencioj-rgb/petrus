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

  // Register the SW, request permission, fetch the token.
  function enablePushFor(user) {
    navigator.serviceWorker.register('firebase-messaging-sw.js')
      .then(function (registration) {
        return Notification.requestPermission().then(function (permission) {
          if (permission !== 'granted') {
            console.log('[push] permission not granted:', permission);
            return;
          }
          return messaging.getToken({
            vapidKey: PETRUS_VAPID_KEY,
            serviceWorkerRegistration: registration
          }).then(function (token) {
            saveToken(token, user);
          });
        });
      })
      .catch(function (err) {
        console.log('[push] enable failed:', err.message);
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
    // Give the SW a moment, then enable.
    enablePushFor(user);
  });

  // Expose a manual trigger (e.g. an "Enable notifications" button).
  window.petrusEnablePush = function () {
    var user = firebase.auth().currentUser;
    if (!user) { alert('Please sign in first.'); return; }
    enablePushFor(user);
  };
})();
