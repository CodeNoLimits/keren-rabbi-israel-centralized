#!/usr/bin/env node

/**
 * Script pour copier attached_assets vers dist/public lors du build
 * Nécessaire pour que les images soient disponibles sur Netlify
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '..');
const sourceAssets = path.join(projectRoot, 'attached_assets');
const destAssets = path.join(projectRoot, 'dist', 'public', 'attached_assets');

console.log('📦 Copie des images attached_assets vers dist/public...');

// Vérifier que source existe
if (!fs.existsSync(sourceAssets)) {
  console.error(`❌ Erreur: ${sourceAssets} n'existe pas`);
  process.exit(1);
}

// Créer dossier destination
if (!fs.existsSync(destAssets)) {
  fs.mkdirSync(destAssets, { recursive: true });
  console.log(`✅ Créé: ${destAssets}`);
}

// Copier tous les fichiers JPG/PNG
const files = fs.readdirSync(sourceAssets);
let copied = 0;

for (const file of files) {
  if (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png') || file.endsWith('.webp')) {
    const sourceFile = path.join(sourceAssets, file);
    const destFile = path.join(destAssets, file);
    
    try {
      fs.copyFileSync(sourceFile, destFile);
      copied++;
    } catch (error) {
      console.error(`❌ Erreur copie ${file}:`, error);
    }
  }
}

console.log(`✅ ${copied} images copiées vers dist/public/attached_assets/`);
console.log('✨ Assets prêts pour déploiement Netlify');

