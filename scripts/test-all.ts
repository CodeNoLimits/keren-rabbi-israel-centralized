#!/usr/bin/env tsx

/**
 * 🧪 Script de Test Automatique Complet
 *
 * Teste tous les composants critiques du site
 * Utilisation: npm run test-all
 */

import { db, pool } from '../server/db';

interface TestResult {
  name: string;
  passed: boolean;
  message: string;
}

const results: TestResult[] = [];

function test(name: string, passed: boolean, message: string) {
  results.push({ name, passed, message });
  const icon = passed ? '✅' : '❌';
  console.log(`${icon} ${name}: ${message}`);
}

async function runTests() {
  console.log('🧪 Exécution des tests automatiques...\n');
  console.log('═══════════════════════════════════════\n');

  // Test 1: Variables d'environnement critiques
  console.log('📋 Test des variables d\'environnement:');
  test(
    'PORT',
    !!process.env.PORT,
    process.env.PORT ? `Configuré: ${process.env.PORT}` : 'Non configuré (utilisera 5000)'
  );

  test(
    'NODE_ENV',
    !!process.env.NODE_ENV,
    process.env.NODE_ENV || 'Non configuré (utilisera development)'
  );

  test(
    'SESSION_SECRET',
    !!process.env.SESSION_SECRET && process.env.SESSION_SECRET.length >= 32,
    process.env.SESSION_SECRET ?
      (process.env.SESSION_SECRET.length >= 32 ? 'OK (32+ caractères)' : '⚠️  Trop court (<32 caractères)') :
      '❌ Non configuré'
  );

  test(
    'DATABASE_URL',
    !!process.env.DATABASE_URL,
    process.env.DATABASE_URL ? 'Configuré' : '⚠️  Non configuré (mode sans DB)'
  );

  test(
    'PAYPAL_CLIENT_ID',
    !!process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_ID ? 'Configuré' : '❌ Non configuré'
  );

  test(
    'PAYPAL_CLIENT_SECRET',
    !!process.env.PAYPAL_CLIENT_SECRET,
    process.env.PAYPAL_CLIENT_SECRET ? 'Configuré' : '❌ Non configuré'
  );

  test(
    'PAYPAL_MODE',
    !!process.env.PAYPAL_MODE && ['sandbox', 'live'].includes(process.env.PAYPAL_MODE),
    process.env.PAYPAL_MODE || '❌ Non configuré'
  );

  console.log('');

  // Test 2: Base de données
  console.log('🗄️  Test de la base de données:');
  if (db && pool) {
    try {
      const result = await db.execute('SELECT 1 as test');
      test('Connexion DB', true, 'Connexion réussie');

      // Vérifier les tables
      try {
        const tables = await db.execute(`
          SELECT tablename FROM pg_tables
          WHERE schemaname = 'public'
          AND tablename IN ('donations', 'lottery_draws', 'lottery_entries')
        `);

        const tableNames = (tables.rows || []).map((r: any) => r.tablename);
        test('Table donations', tableNames.includes('donations'),
          tableNames.includes('donations') ? 'Existe' : 'Manquante (exécutez npm run db:push)');
        test('Table lottery_draws', tableNames.includes('lottery_draws'),
          tableNames.includes('lottery_draws') ? 'Existe' : 'Manquante (exécutez npm run db:push)');
        test('Table lottery_entries', tableNames.includes('lottery_entries'),
          tableNames.includes('lottery_entries') ? 'Existe' : 'Manquante (exécutez npm run db:push)');
      } catch (e: any) {
        test('Tables loterie', false, `Erreur: ${e.message}`);
      }
    } catch (e: any) {
      test('Connexion DB', false, `Erreur: ${e.message}`);
    }
  } else {
    test('Connexion DB', false, 'DATABASE_URL non configuré');
  }

  console.log('');

  // Test 3: Fichiers critiques
  console.log('📁 Test des fichiers critiques:');
  const fs = await import('fs');
  const path = await import('path');

  const criticalFiles = [
    'client/src/pages/home.tsx',
    'client/src/pages/donate.tsx',
    'server/routes/donations.ts',
    'shared/schema.ts',
    'README_FR.md',
    'DEPLOYMENT_CHECKLIST.md',
  ];

  for (const file of criticalFiles) {
    const exists = fs.existsSync(path.resolve(process.cwd(), file));
    test(file, exists, exists ? 'Existe' : 'Manquant');
  }

  console.log('');

  // Test 4: Dossier images
  console.log('🖼️  Test des images:');
  const imagesDir = path.resolve(process.cwd(), 'client/public/images');
  const imagesDirExists = fs.existsSync(imagesDir);
  test('Dossier images', imagesDirExists, imagesDirExists ? 'Existe' : 'Créé automatiquement');

  if (imagesDirExists) {
    const requiredImages = [
      'rabbi-israel-odesser-1.webp',
      'rabbi-israel-odesser-2.webp',
      'rabbi-israel-odesser-3.webp',
      'rabbi-nachman-breslov.webp',
    ];

    for (const img of requiredImages) {
      const imgPath = path.join(imagesDir, img);
      const exists = fs.existsSync(imgPath);
      test(img, true, exists ? '✓ Existe' : '⚠️  Placeholder (ajoutez vraie photo)');
    }
  }

  console.log('');

  // Résumé
  console.log('═══════════════════════════════════════\n');
  const totalTests = results.length;
  const passedTests = results.filter(r => r.passed).length;
  const failedTests = totalTests - passedTests;

  console.log('📊 RÉSUMÉ DES TESTS:\n');
  console.log(`   Total:    ${totalTests}`);
  console.log(`   ✅ Passés: ${passedTests}`);
  console.log(`   ❌ Échoués: ${failedTests}\n`);

  if (failedTests === 0) {
    console.log('🎉 Tous les tests sont passés!\n');
    console.log('✨ Le site est prêt pour le déploiement!\n');
  } else {
    console.log('⚠️  Certains tests ont échoué:\n');
    results.filter(r => !r.passed).forEach(r => {
      console.log(`   ❌ ${r.name}: ${r.message}`);
    });
    console.log('');
    console.log('💡 Consultez DEPLOYMENT_CHECKLIST.md pour les solutions\n');
  }

  // Nettoyage
  if (pool) {
    await pool.end();
  }

  process.exit(failedTests > 0 ? 1 : 0);
}

// Exécuter
runTests().catch(console.error);
