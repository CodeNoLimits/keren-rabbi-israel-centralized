# 🔤 Translation Action Checklist

## For: Yaakov Renne (4100510@gmail.com)
## Date: February 11, 2026
## Task: Complete missing product name translations

---

## 📋 Phase 1: Tier 1 Products (PRIORITY - Do First)

**Budget**: $18-45 USD | **Time**: 1-2 days | **Impact**: Highest ROI

### Products to Translate (3 new + 2 already done)

- [x] **likutei-moharan** - ליקוטי מוהר"ן (DONE ✓)
- [x] **likutei-tefilot** - ליקוטי תפילות (DONE ✓)
- [ ] **siporei-masiyot** - סיפורי מעשיות
  - [ ] French: _________________
  - [ ] Spanish: _________________
  - [ ] Russian: _________________
- [ ] **tikkun-haklali** - תיקון הכללי
  - [ ] French: _________________
  - [ ] Spanish: _________________
  - [ ] Russian: _________________
- [ ] **kol-bo-leyeshuot** - כל בו לישועות
  - [ ] French: _________________
  - [ ] Spanish: _________________
  - [ ] Russian: _________________

---

## 📋 Phase 2: Tier 2 Products (Do Second)

**Budget**: $30-75 USD | **Time**: 1-2 days | **Impact**: Popular items

### Products to Translate (5 products)

- [ ] **sefer-hamidot** - ספר המידות
  - [ ] French: _________________
  - [ ] Spanish: _________________
  - [ ] Russian: _________________
- [ ] **likutei-etzot** - ליקוטי עצות
  - [ ] French: _________________
  - [ ] Spanish: _________________
  - [ ] Russian: _________________
- [ ] **sichos-haran** - שיחות הר"ן
  - [ ] French: _________________
  - [ ] Spanish: _________________
  - [ ] Russian: _________________
- [ ] **tehilim** - תהילים
  - [ ] French: _________________
  - [ ] Spanish: _________________
  - [ ] Russian: _________________
- [ ] **avi-hanachal** - אבי הנחל
  - [ ] French: _________________
  - [ ] Spanish: _________________
  - [ ] Russian: _________________

---

## 📋 Phase 3: Complete Catalog (Do Last)

**Budget**: $198-495 USD | **Time**: 1-2 weeks | **Impact**: Full international coverage

### Remaining 33 Products

1. [ ] **kitzur-likutei-moharan** - קיצור ליקוטי מוהר"ן
2. [ ] **alim-letrufah** - עלים לתרופה
3. [ ] **hishtapchut-hanefesh** - השתפכות הנפש ומשיבת נפש
4. [ ] **likutei-halakhot** - ליקוטי הלכות
5. [ ] **etzot-hamevuarot** - עצות המבוארות
6. [ ] **chayei-moharan** - חיי מוהר"ן
7. [ ] **yimei-maharanat** - ימי מוהרנ"ת
8. [ ] **kochvei-ohr** - כוכבי אור
9. [ ] **rosh-hashana-sheli** - ראש השנה שלי
10. [ ] **itzumo-shel-yom** - עיצומו של יום
11. [ ] **ki-naar-yisrael** - כי נער ישראל
12. [ ] **toda-vehodaa** - תודה והודאה
13. [ ] **hatchalat-hathchlatot** - התחלת ההתחלות
14. [ ] **hitgalut-hadaat** - התגלות הדעת
15. [ ] **otzer-hayirah** - אוצר היראה
16. [ ] **chumash-likutei-halakhot** - חומש עם ליקוטי הלכות
17. [ ] **yekara-deshabbata** - יקרא דשבתא
18. [ ] **yareach-haeitanim** - ירח האיתנים
19. [ ] **maafer-lefaar** - מאפר לפאר
20. [ ] **mem-tet-shaarim** - מט' שערים
21. [ ] **sod-harashbi** - סוד הרשב"י
22. [ ] **shaar-hachamishim** - שער החמישים
23. [ ] **nachal-novea** - נחל נובע
24. [ ] **sichos-vehitorerut** - שיחות והתעוררות
25. [ ] **mikhtavei-rabbi-natan-tiveria** - מכתבי רבי נתן מטבריה
26. [ ] **parparaot-al-hashas** - פרפראות על הש"ס
27. [ ] **likutei-even** - ליקוטי אבן
28. [ ] **yisrael-saba** - ישראל סבא
29. [ ] **maayen-hamitgaber** - מעין המתגבר
30. [ ] **shemot-hatzadikim** - שמות הצדיקים
31. [ ] **shema-yisrael** - שמע ישראל
32. [ ] **emunat-itecha** - אמונת עתיך
33. [ ] **rabbenu-hakadosh** - רבינו הקדוש

---

## 🛠️ Implementation Steps

### Step 1: Choose Translation Method

**Option A: Professional Translation Service**
- Cost: $2-5 per translation
- Quality: High
- Time: 2-7 days
- Recommended: Upwork, Fiverr, Rev.com

**Option B: Team Member (if fluent)**
- Cost: Internal time
- Quality: Depends on fluency
- Time: 1-3 days per phase

**Option C: AI Translation (Review Required)**
- Cost: Free (Claude/ChatGPT)
- Quality: Good for book titles
- Time: Immediate
- **Note**: Must be reviewed by native speaker

### Step 2: Update realProducts.ts

For each product, update these fields:
```typescript
nameFrench: 'French translation here',
nameSpanish: 'Spanish translation here',
nameRussian: 'Russian translation here',
```

### Step 3: Test Language Selector

1. Switch to French → verify all Tier 1 products show French names
2. Switch to Spanish → verify all Tier 1 products show Spanish names
3. Switch to Russian → verify all Tier 1 products show Russian names
4. Check fallback: If translation missing, should show English

### Step 4: Verify on Live Site

1. Deploy to staging
2. Test each language
3. Have native speakers review
4. Deploy to production

---

## 📊 Progress Tracking

**Phase 1**: ☐☐☐ (0/3 new products completed)
**Phase 2**: ☐☐☐☐☐ (0/5 products completed)
**Phase 3**: ☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐☐ (0/33 products completed)

**Total Progress**: 2/43 products complete (4.7%)

---

## 🎯 Success Metrics

- [ ] Phase 1 complete (5 products)
- [ ] Language selector works for all 3 languages
- [ ] Native speaker approval received
- [ ] Phase 2 complete (10 products total)
- [ ] Phase 3 complete (43 products total)
- [ ] International sales increase tracked

---

## 📝 Notes & Considerations

1. **Transliteration vs Translation**
   - Some Hebrew book titles are transliterated (keep Hebrew sounds)
   - Example: "Likutei Moharan" stays similar across languages
   - Check with Breslov community standards

2. **Character Encoding**
   - Test Russian Cyrillic displays correctly
   - Test Spanish special characters (ñ, á, é, í, ó, ú)
   - Test French accents (é, è, ê, ç)

3. **SEO Considerations**
   - Translated names help international SEO
   - Consider adding alt text in target languages

4. **Cultural Notes**
   - Some titles may need cultural adaptation
   - Consult with community members for sensitive titles

---

## 📞 Contact for Questions

**Client**: Yaakov Renne
**Email**: 4100510@gmail.com
**Site**: https://haesh-sheli-new.vercel.app/

---

**Checklist Created**: February 11, 2026
**By**: Claude Sonnet 4.5
**Related Files**:
- PRODUCT_AUDIT_REPORT.md (detailed analysis)
- AUDIT_SUMMARY.json (data summary)
- AUDIT_VISUAL_SUMMARY.md (visual overview)
