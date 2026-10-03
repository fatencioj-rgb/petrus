// ═══════════════════════════════════════════════════════════════════
// Petrus FOH — Firebase Auth & Access Logging
// ═══════════════════════════════════════════════════════════════════
// Firebase config — replace with your actual project credentials
// If reusing "fiorella-petrus-password" project, update these values
// from Firebase Console > Project Settings > Your apps > Config

const firebaseConfig = {
  apiKey: "AIzaSyAZSXeztJmLCTlaTYYPqjhpAEJTNaWg6so",
  authDomain: "petrus-foh.firebaseapp.com",
  projectId: "petrus-foh",
  storageBucket: "petrus-foh.firebasestorage.app",
  messagingSenderId: "757004948096",
  appId: "1:757004948096:web:7172cd15aaf80b35410c65"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// ═══════════════════════════════════════════════════════════════════
// Access control — which sections each user may see.
// Sections: 'training', 'sommeliers', 'operations', 'admin'.
// Everyone always has access to the home page and training.
// ═══════════════════════════════════════════════════════════════════
var PETRUS_ACCESS = {
  'guest@petrus.local':    ['training'],
  'tanvir@petrus.local':   ['training'],
  'cain@petrus.local':     ['training'],
  'johnny@petrus.local':   ['training'],
  'irena@petrus.local':    ['training'],
  'christian@petrus.local':['training','sommeliers'],
  'liza@petrus.local':     ['training','operations'],
  'milena@petrus.local':   ['training','sommeliers','operations'],
  'fiorella@petrus.local': ['training','sommeliers','operations','admin'],
};

// Guest = a limited viewer: only Training, no notes, other buttons hidden.
function isPetrusGuest(user){
  return !!(user && user.email && user.email.toLowerCase().indexOf('guest') === 0);
}
// Team roster used by the notes recipient picker.
var PETRUS_TEAM = [
  { email:'fiorella@petrus.local', name:'Fiorella' },
  { email:'milena@petrus.local',   name:'Milena' },
  { email:'christian@petrus.local',name:'Christian' },
  { email:'liza@petrus.local',     name:'Liza' },
  { email:'tanvir@petrus.local',   name:'Tanvir' },
  { email:'cain@petrus.local',     name:'Cain' },
  { email:'johnny@petrus.local',   name:'Johnny' },
  { email:'irena@petrus.local',    name:'Irena' },
];

// Pages that belong to each section (for the URL guard).
var SECTION_PAGES = {
  training:   ['training.html','winelist.html','wine-pairings.html','wine-btg.html','food-net.html','food-editor.html'],
  sommeliers: ['sommeliers.html','somm-stock.html','somm-deliveries.html','somm-duties.html','somm-orders.html','somm-recipes.html','somm-reports.html','somm-shift.html','somm-stocktake.html','somm-transfers.html','somm-wastages.html','somm-weekly.html','somm-holiday.html','somm-pairings.html','somm-sales.html','somm-viniv.html','somm-admin.html'],
  operations: ['operations.html'],
  admin:      ['admin.html'],
};
// Pages everyone (any signed-in user) may open.
var PUBLIC_PAGES = ['index.html'];

function getAllowedSections(user){
  if(!user || !user.email) return [];
  return PETRUS_ACCESS[user.email] || ['training']; // default: training only
}
function userCanSee(user, section){
  return getAllowedSections(user).indexOf(section) >= 0;
}
function sectionOfPage(page){
  for(var s in SECTION_PAGES){
    if(SECTION_PAGES[s].indexOf(page) >= 0) return s;
  }
  return null; // unknown page → not section-restricted here
}

// ── Restricted screen (shown over a page the user may not access) ──
function showPetrusNoAccess() {
  var overlay = document.createElement('div');
  overlay.id = 'petrus-no-access';
  overlay.style.cssText = 'position:fixed;inset:0;z-index:99999;background:#2d0a0a;color:#faf7f1;'
    + 'display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:40px 24px;'
    + "font-family:'Cormorant Garamond','Georgia',serif;";
  overlay.innerHTML =
    '<div style="font-size:40px;color:#b89650;margin-bottom:14px;">Apologies, you don\u2019t have access.</div>'
    + '<p style="font-family:\'Inter\',sans-serif;font-size:13px;letter-spacing:1px;color:#d4b87a;opacity:0.85;margin-bottom:28px;">This section is restricted for your account.</p>'
    + '<a href="index.html" style="font-family:\'Inter\',sans-serif;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#d4b87a;border:1px solid rgba(184,150,80,0.4);border-radius:6px;padding:10px 22px;text-decoration:none;">\u2190 Back to home</a>';
  // Try to hide the real content underneath.
  try { document.body.style.overflow = 'hidden'; } catch (e) {}
  document.body.appendChild(overlay);
}

// ── Page Guard — show a restricted screen (don't redirect) ──
(function() {
  var page = window.location.pathname.split('/').pop() || 'index.html';
  if (PUBLIC_PAGES.indexOf(page) >= 0) return;
  var section = sectionOfPage(page);
  if (!section) return; // not a guarded page
  auth.onAuthStateChanged(function(user) {
    if (!user) return; // not logged in — login flow handles that
    if (!userCanSee(user, section)) {
      if (document.getElementById('petrus-no-access')) return; // already shown
      if (document.body) showPetrusNoAccess();
      else document.addEventListener('DOMContentLoaded', showPetrusNoAccess);
    }
  });
})();

// ── Auth Functions ────────────────────────────────────────────────

/**
 * Login with display name and personal code.
 * Internally uses email: name@petrus.local / password: code
 */
async function petrusLogin(name, code) {
  const email = name.toLowerCase().replace(/\s+/g, '.') + '@petrus.local';
  try {
    const cred = await auth.signInWithEmailAndPassword(email, code);
    await logAccess(cred.user, 'login');
    return { success: true, user: cred.user };
  } catch (err) {
    console.error('Login error:', err.code);
    return { success: false, error: getErrorMessage(err.code) };
  }
}

/**
 * Logout current user
 */
async function petrusLogout() {
  const user = auth.currentUser;
  if (user) {
    await logAccess(user, 'logout');
  }
  await auth.signOut();
}

/**
 * Log access event to Firestore
 */
async function logAccess(user, action, page) {
  try {
    await db.collection('access_logs').add({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || user.email.split('@')[0].replace(/\./g, ' '),
      action: action,
      page: page || window.location.pathname.split('/').pop() || 'index.html',
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      userAgent: navigator.userAgent
    });
  } catch (err) {
    console.error('Log error:', err);
  }
}

/**
 * Check if user is authenticated. If not, redirect to index.
 * Call this on protected pages.
 */
function requireAuth() {
  return new Promise((resolve) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        logAccess(user, 'page_view');
        resolve(user);
      } else {
        window.location.href = 'index.html';
      }
    });
  });
}

/**
 * Check if current user is admin
 */
async function isAdmin(user) {
  try {
    const doc = await db.collection('admins').doc(user.uid).get();
    return doc.exists;
  } catch (err) {
    return false;
  }
}

/**
 * Get current auth state (non-blocking)
 */
function getCurrentUser() {
  return new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    });
  });
}

// ── Helper Functions ──────────────────────────────────────────────

function getErrorMessage(code) {
  switch (code) {
    case 'auth/user-not-found':
      return 'User not found. Check your name.';
    case 'auth/wrong-password':
      return 'Incorrect code. Try again.';
    case 'auth/invalid-email':
      return 'Invalid name format.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Try again later.';
    case 'auth/invalid-credential':
      return 'Incorrect name or code.';
    default:
      return 'Login failed. Please try again.';
  }
}
