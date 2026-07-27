// Recopie explicitement le site (pas de bundler dans ce projet) vers www/,
// le dossier que Capacitor embarque dans l'app native. Liste blanche volontaire
// (pas de glob) pour ne jamais embarquer functions/, node_modules/, tests/, etc.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const WWW = path.join(ROOT, 'www');

const FILES = ['index.html'];
// Seulement assets/auth-bg (le site en a besoin) — assets/icon.png et assets/splash.png
// sont réservés à `capacitor-assets` (icône/splash natifs), pas à embarquer dans le site.
const DIRS = ['assets/auth-bg'];

fs.rmSync(WWW, { recursive: true, force: true });
fs.mkdirSync(WWW, { recursive: true });

for (const file of FILES) {
  fs.copyFileSync(path.join(ROOT, file), path.join(WWW, file));
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

for (const dir of DIRS) {
  copyDir(path.join(ROOT, dir), path.join(WWW, dir));
}

console.log(`www/ prêt (${FILES.join(', ')} + ${DIRS.join(', ')}/)`);
