/* ═══════════════════════════════════════════════════════════════════
   Petrus FOH — Firebase Cloud Messaging Service Worker
   ───────────────────────────────────────────────────────────────────
   Receives push notifications when the app is in the background or
   completely closed. Must live at the site root so its scope covers
   every page. This file is INDEPENDENT from viniv — it only handles
   push notifications for the petrus-foh Firebase project.
   ═══════════════════════════════════════════════════════════════════ */

importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

// Same project as auth.js — notifications live inside the existing project.
firebase.initializeApp({
  apiKey: "AIzaSyAZSXeztJmLCTlaTYYPqjhpAEJTNaWg6so",
  authDomain: "petrus-foh.firebaseapp.com",
  projectId: "petrus-foh",
  storageBucket: "petrus-foh.firebasestorage.app",
  messagingSenderId: "757004948096",
  appId: "1:757004948096:web:7172cd15aaf80b35410c65"
});

const messaging = firebase.messaging();

// Background messages → show a notification.
messaging.onBackgroundMessage(function (payload) {
  const n = payload.notification || {};
  const data = payload.data || {};
  const title = n.title || data.title || 'Petrus';
  const options = {
    body: n.body || data.body || '',
    icon: 'icons/icon-192.png',
    badge: 'icons/icon-192.png',
    tag: data.tag || 'petrus-notification',
    data: { url: data.url || 'index.html' }
  };
  self.registration.showNotification(title, options);
});

// Tapping a notification focuses an open tab or opens the target page.
self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  const target = (event.notification.data && event.notification.data.url) || 'index.html';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (list) {
      for (const client of list) {
        if (client.url.includes(target) && 'focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow(target);
    })
  );
});
