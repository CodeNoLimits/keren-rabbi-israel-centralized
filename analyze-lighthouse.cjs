#!/usr/bin/env node

const data = require('./lighthouse-report-20260212-132215.report.json');

console.log('🎯 LIGHTHOUSE AUDIT ANALYSIS');
console.log('============================\n');

console.log('📊 SCORES:');
console.log(`Performance: ${Math.round(data.categories.performance.score * 100)}/100`);
console.log(`Accessibility: ${Math.round(data.categories.accessibility.score * 100)}/100`);
console.log(`Best Practices: ${Math.round(data.categories['best-practices'].score * 100)}/100`);
console.log(`SEO: ${Math.round(data.categories.seo.score * 100)}/100`);
console.log('');

console.log('⚡ KEY METRICS:');
console.log(`FCP: ${data.audits['first-contentful-paint'].displayValue}`);
console.log(`LCP: ${data.audits['largest-contentful-paint'].displayValue}`);
console.log(`TBT: ${data.audits['total-blocking-time'].displayValue}`);
console.log(`CLS: ${data.audits['cumulative-layout-shift'].displayValue}`);
console.log(`Speed Index: ${data.audits['speed-index'].displayValue}`);
console.log('');

console.log('🔍 TOP PERFORMANCE OPPORTUNITIES:');
console.log('===================================\n');

const opportunities = Object.entries(data.audits)
  .filter(([k, v]) => v.details && v.details.type === 'opportunity')
  .map(([key, audit]) => ({
    key,
    title: audit.title,
    savings: audit.displayValue,
    score: audit.score,
    numericValue: audit.numericValue || 0
  }))
  .sort((a, b) => b.numericValue - a.numericValue)
  .slice(0, 10);

opportunities.forEach((opp, idx) => {
  console.log(`${idx + 1}. ${opp.title}`);
  console.log(`   Potential savings: ${opp.savings || 'N/A'}`);
  console.log(`   Score: ${Math.round((opp.score || 0) * 100)}/100`);
  console.log('');
});

console.log('🚨 FAILED AUDITS (Score = 0):');
console.log('==============================\n');

const failed = Object.entries(data.audits)
  .filter(([k, v]) => v.score !== null && v.score < 0.5)
  .slice(0, 15);

failed.forEach(([key, audit], idx) => {
  console.log(`${idx + 1}. ${audit.title}`);
  console.log(`   Score: ${Math.round((audit.score || 0) * 100)}/100`);
  if (audit.displayValue) {
    console.log(`   Value: ${audit.displayValue}`);
  }
  console.log('');
});

console.log('📈 SUMMARY:');
console.log('===========');
console.log(`Total opportunities: ${opportunities.length}`);
console.log(`Failed audits: ${failed.length}`);
console.log(`Overall score: ${Math.round(data.categories.performance.score * 100)}/100`);
