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

// Activarse de inmediato cuando hay una versión nueva, sin esperar a que se
// cierren todas las pestañas. Esto permite actualizar el SW SIN reinstalar.
self.addEventListener('install', function (event) {
  self.skipWaiting();
});
self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim());
});

// Background messages → show ONE notification built from `data` only.
// We send data-only messages from the server (no `notification` field), so
// FCM does NOT auto-display anything; this handler is the single source of
// truth. Title is always "Petrus FOH"; the detail goes in the body.
messaging.onBackgroundMessage(function (payload) {
  const data = payload.data || {};
  const title = 'Petrus FOH';
  const options = {
    body: data.body || '',
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
