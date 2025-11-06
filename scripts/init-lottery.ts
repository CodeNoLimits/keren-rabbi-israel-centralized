#!/usr/bin/env tsx

/**
 * 🎁 Script d'Initialisation de la Loterie
 *
 * Ce script crée automatiquement un tirage au sort actif dans la base de données
 * Utilisation: npm run init-lottery
 */

import { db, pool } from '../server/db';
import { lotteryDraws } from '../shared/schema';

async function initLottery() {
  console.log('🎁 Initialisation du système de loterie...\n');

  if (!db || !pool) {
    console.error('❌ Base de données non configurée!');
    console.error('   Ajoutez DATABASE_URL dans .env\n');
    process.exit(1);
  }

  try {
    // Dates pour le tirage
    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth(), 1); // 1er du mois
    const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59); // Dernier jour du mois
    const drawDate = new Date(now.getFullYear(), now.getMonth() + 1, 1, 12, 0, 0); // 1er du mois suivant

    const monthNames = {
      he: ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'],
      en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    };

    const month = now.getMonth();
    const year = now.getFullYear();

    console.log('📅 Création d\'un tirage actif...');
    console.log(`   Période: ${startDate.toLocaleDateString('fr-FR')} - ${endDate.toLocaleDateString('fr-FR')}`);
    console.log(`   Tirage: ${drawDate.toLocaleDateString('fr-FR')}\n`);

    // Créer le tirage
    const [draw] = await db.insert(lotteryDraws).values({
      name: `Monthly Draw - ${monthNames.en[month]} ${year}`,
      nameHebrew: `הגרלה חודשית - ${monthNames.he[month]} ${year}`,
      description: 'Monthly lottery draw for all donors',
      descriptionHebrew: 'הגרלה חודשית לכל התורמים',
      prizeAmount: 500000, // 5000 ₪ en agorot
      prizeCurrency: 'ILS',
      prizeDescription: 'Cash prize',
      prizeDescriptionHebrew: 'פרס במזומן',
      startDate,
      endDate,
      drawDate,
      status: 'active',
      minimumDonation: 1800, // 18 ₪ minimum
      allowMultipleEntries: true,
      maxEntriesPerPerson: null,
    }).returning();

    console.log('✅ Tirage créé avec succès!\n');
    console.log('📊 Détails du tirage:');
    console.log(`   ID: ${draw.id}`);
    console.log(`   Nom: ${draw.nameHebrew}`);
    console.log(`   Prix: ${draw.prizeAmount / 100} ₪`);
    console.log(`   Don minimum: ${draw.minimumDonation / 100} ₪`);
    console.log(`   Statut: ${draw.status}\n`);

    console.log('🎉 Le système de loterie est maintenant actif!');
    console.log('   Les donations ≥ 18 ₪ seront automatiquement inscrites.\n');

  } catch (error: any) {
    console.error('❌ Erreur lors de la création du tirage:');
    console.error(`   ${error.message}\n`);

    if (error.code === '42P01') {
      console.error('💡 Solution: Exécutez d\'abord npm run db:push\n');
    }

    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Exécuter
initLottery().catch(console.error);
