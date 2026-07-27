// One-shot: convertit les 4 grandes illustrations SVG de l'écran de connexion
// (2,6-4,4 Mo chacune, art généré par IA vectorisé, pas du vecteur exploité comme tel)
// en WebP compressé. À relancer manuellement seulement si ces images changent.
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT_DIR = path.join(ROOT, 'assets', 'auth-bg');
const TARGET_WIDTH = 1280;
const QUALITY = 80;

const FILES = [
  'u8377829582_dessin_noir_et_blanc_dun_vignoble_bourguignon_--v_09c20008-6683-443b-a152-ddb97552f0aa_1.svg',
  'u8377829582_dessin_noir_et_blanc_dune_grande_cave__vin_souter_0f107ff0-7915-4272-ab17-f054e3fcbf01_2.svg',
  'u8377829582_fill_the_image_with_the_tonneau_--ar_11_--v_7_27ffba7d-eb2e-4605-ad04-502ad6f4d769_1.svg',
  "u8377829582_httpss.mj.runFnT1zUruwXY_je_veux_un_dessin_noir_e_74e1e656-ea64-4484-83be-c3edd1b2eeaf_1 (1).svg",
];

fs.mkdirSync(OUT_DIR, { recursive: true });

for (const [i, file] of FILES.entries()) {
  const src = path.join(ROOT, file);
  const outName = `auth-bg-${i + 1}.webp`;
  const dest = path.join(OUT_DIR, outName);
  const before = fs.statSync(src).size;
  await sharp(src, { density: 300 })
    .resize({ width: TARGET_WIDTH })
    .webp({ quality: QUALITY })
    .toFile(dest);
  const after = fs.statSync(dest).size;
  console.log(`${file} -> assets/auth-bg/${outName}  ${(before/1e6).toFixed(2)}MB -> ${(after/1e3).toFixed(0)}KB`);
}
