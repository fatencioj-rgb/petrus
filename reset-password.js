// ═══════════════════════════════════════════════════════════════════
// Petrus — Reset a user's password via Firebase Admin SDK
// ═══════════════════════════════════════════════════════════════════
// Usage:
//   1. Place your Firebase service account key as serviceAccountKey.json
//      in this folder (petrus-site). It is git-ignored.
//   2. Run:  npm install firebase-admin
//   3. Run:  node reset-password.js
//   4. Follow the prompts (email + new password).
//
// This talks directly to Firebase Auth with admin privileges, so it works
// even for @petrus.local accounts that have no real email inbox.
// ═══════════════════════════════════════════════════════════════════

const admin = require('firebase-admin');
const readline = require('readline');
const path = require('path');
const fs = require('fs');

const KEY_PATH = path.join(__dirname, 'serviceAccountKey.json');

if (!fs.existsSync(KEY_PATH)) {
  console.error('\n[X] No se encontró serviceAccountKey.json en esta carpeta.');
  console.error('    Descárgalo de Firebase Console > Project settings > Service accounts');
  console.error('    > Generate new private key, y guárdalo aquí como serviceAccountKey.json\n');
  process.exit(1);
}

const serviceAccount = require(KEY_PATH);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((res) => rl.question(q, (a) => res(a.trim())));

async function main() {
  console.log('\n=== Petrus — Reset de contraseña (Firebase Admin) ===');
  console.log('Proyecto:', serviceAccount.project_id, '\n');

  // Default target is fiorella; can be changed at the prompt.
  let name = await ask('Usuario (nombre, ej. "fiorella") [fiorella]: ');
  if (!name) name = 'fiorella';

  // Mirror the app's login rule: name -> name@petrus.local
  const email = name.toLowerCase().replace(/\s+/g, '.') + '@petrus.local';

  let user;
  try {
    user = await admin.auth().getUserByEmail(email);
  } catch (err) {
    console.error(`\n[X] No existe una cuenta para ${email} (${err.code}).`);
    console.error('    Revisa el nombre. Debe coincidir con el usuario en Firebase Auth.\n');
    rl.close();
    process.exit(1);
  }

  console.log(`\nCuenta encontrada: ${user.email}  (uid: ${user.uid})`);

  const pw1 = await ask('Nueva contraseña (mín. 6 caracteres): ');
  if (!pw1 || pw1.length < 6) {
    console.error('\n[X] La contraseña debe tener al menos 6 caracteres.\n');
    rl.close();
    process.exit(1);
  }
  const pw2 = await ask('Repite la nueva contraseña: ');
  if (pw1 !== pw2) {
    console.error('\n[X] Las contraseñas no coinciden. No se cambió nada.\n');
    rl.close();
    process.exit(1);
  }

  try {
    await admin.auth().updateUser(user.uid, { password: pw1 });
    console.log(`\n[OK] Contraseña actualizada para ${user.email}.`);
    console.log('     Ya puedes iniciar sesión en la web con el nuevo código.\n');
  } catch (err) {
    console.error('\n[X] Error al actualizar la contraseña:', err.message, '\n');
  }

  rl.close();
}

main();
