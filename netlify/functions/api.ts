/**
 * Netlify Serverless Function pour API
 *
 * ⚠️ ATTENTION: Cette approche est limitée pour une app full-stack complexe
 * Netlify Functions ont des limitations:
 * - Timeout de 10 secondes (gratuit) / 26 secondes (payant)
 * - Pas de connexions persistantes à la DB
 * - Cold starts peuvent être lents
 *
 * 🎯 RECOMMANDATION: Utilisez RENDER.COM pour cette application
 * Render est optimisé pour les apps full-stack avec Express et PostgreSQL
 */

import serverless from '@netlify/functions';

// Cette fonction wrappera votre app Express
// Pour l'instant, c'est un placeholder car l'app nécessite Render

export const handler = async (event: any, context: any) => {
  return {
    statusCode: 503,
    body: JSON.stringify({
      error: 'Service non disponible',
      message: 'Cette application nécessite un serveur full-stack. Utilisez Render.com pour le déploiement.',
      redirect: 'https://render.com',
    }),
  };
};
