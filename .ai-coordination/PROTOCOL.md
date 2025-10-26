# 🤝 PROTOCOLE DE COORDINATION CLAUDE ↔ CURSOR

**RÈGLE ABSOLUE :** Claude Code et Cursor doivent **TOUJOURS** se coordonner pour éviter conflits et doublons.

---

## 🚨 PROBLÈME À ÉVITER

Sans coordination :
- ❌ Doublons de fichiers (composant créé 2x)
- ❌ Conflits git (modifications simultanées)
- ❌ Écrasement de code (perte de travail)
- ❌ Incohérences (styles différents)

---

## ✅ PROTOCOLE OBLIGATOIRE

### AVANT TOUTE MODIFICATION

#### Pour Claude Code :
```bash
1. git status                 # Voir modifications Cursor en cours
2. git branch                 # Vérifier branche active
3. Read fichier concerné      # Voir version actuelle
4. Demander à l'utilisateur : "Cursor travaille sur ce fichier ?"
5. Écrire dans .ai-coordination/claude-working.md ce que je fais
6. Procéder SEULEMENT après confirmation
```

#### Pour Cursor :
```bash
1. Lire .ai-coordination/claude-working.md  # Voir ce que Claude fait
2. Lire .cursor/claude-changes.md           # Voir changements récents
3. git status                                # Voir modifications Claude
4. Demander à l'utilisateur : "Claude travaille actuellement ?"
5. Écrire dans .ai-coordination/cursor-working.md ce que je fais
6. Procéder SEULEMENT après confirmation
```

---

## 📁 SYSTÈME DE FICHIERS DE COORDINATION

### `.ai-coordination/claude-working.md`
**Mis à jour par Claude en temps réel :**
```markdown
## 🤖 CLAUDE TRAVAILLE ACTUELLEMENT SUR :

**Date/Heure :** 20 Oct 2025 14:30
**Branche :** feature/complete-app-v2
**Status :** ✅ Terminé | ⏳ En cours | ⏸️ En pause

### Fichiers en cours de modification :
- [ ] server/routes.ts (ajout ligne 1081)
- [ ] shared/schema.ts (ajout tables)

### Prochaines actions :
1. Créer server/newFeatures.ts
2. Créer composants React

**⚠️ CURSOR : Attends que status = "Terminé" avant de toucher ces fichiers**
```

### `.ai-coordination/cursor-working.md`
**Mis à jour par Cursor en temps réel :**
```markdown
## 🎯 CURSOR TRAVAILLE ACTUELLEMENT SUR :

**Date/Heure :** [timestamp]
**Branche :** [branch name]
**Status :** ✅ Terminé | ⏳ En cours | ⏸️ En pause

### Fichiers en cours de modification :
- [ ] client/src/pages/home.tsx
- [ ] client/src/styles/global.css

### Prochaines actions :
1. Ajouter section newsletter au footer
2. Intégrer ProductRecommendations

**⚠️ CLAUDE : Attends que status = "Terminé" avant de toucher ces fichiers**
```

### `.ai-coordination/sync-log.md`
**Historique des synchronisations :**
```markdown
## 📜 LOG DE SYNCHRONISATION

### 20 Oct 2025 14:30 - Claude
- Créé server/newFeatures.ts
- Modifié shared/schema.ts (+4 tables)
- Créé 3 composants React
- Status: ✅ Terminé, OK pour Cursor

### 20 Oct 2025 15:00 - Cursor
- Intégré NewsletterSignup dans footer
- Modifié client/src/pages/home.tsx
- Status: ✅ Terminé, OK pour Claude
```

---

## 🔄 WORKFLOW DE COORDINATION

### Scénario 1 : Claude veut modifier un fichier

```
1. Claude check git status
2. Claude lit .ai-coordination/cursor-working.md
3. SI Cursor travaille dessus → STOP, demander à utilisateur
4. SINON → Écrire dans claude-working.md "Je modifie X"
5. Faire la modification
6. Update claude-working.md "Terminé X"
7. git add + commit avec message clair
8. Update .cursor/claude-changes.md
```

### Scénario 2 : Cursor veut modifier un fichier

```
1. Cursor check git status
2. Cursor lit .ai-coordination/claude-working.md
3. SI Claude travaille dessus → STOP, demander à utilisateur
4. SINON → Écrire dans cursor-working.md "Je modifie X"
5. Faire la modification
6. Update cursor-working.md "Terminé X"
7. git add + commit avec message clair
```

### Scénario 3 : Modifications simultanées nécessaires

```
1. Utilisateur dit : "Claude et Cursor, travaillez ensemble sur X"
2. Claude crée branche : claude-work-X
3. Cursor crée branche : cursor-work-X
4. Chacun travaille sur sa branche
5. Utilisateur merge manuellement ou demande merge
6. Claude + Cursor vérifient pas de conflits
```

---

## 📋 CHECKLIST COORDINATION (OBLIGATOIRE)

### Avant chaque modification, TOUJOURS :

#### Pour Claude :
- [ ] `git status` vérifié
- [ ] `.ai-coordination/cursor-working.md` lu
- [ ] Fichier actuel lu avec Read
- [ ] Utilisateur informé du changement
- [ ] `.ai-coordination/claude-working.md` mis à jour
- [ ] Pas de conflit détecté

#### Pour Cursor :
- [ ] `git status` vérifié
- [ ] `.ai-coordination/claude-working.md` lu
- [ ] `.cursor/claude-changes.md` lu
- [ ] Utilisateur informé du changement
- [ ] `.ai-coordination/cursor-working.md` mis à jour
- [ ] Pas de conflit détecté

---

## 🚨 DÉTECTION AUTOMATIQUE DE CONFLITS

### Signes d'alerte :

1. **Fichier dans git status "Modified"**
   → L'autre IA travaille probablement dessus

2. **Timestamp récent sur fichier**
   → Modifié il y a < 5 minutes → probable conflit

3. **Message dans working.md**
   → "En cours" sur même fichier → CONFLIT CERTAIN

### Action immédiate si conflit détecté :

```
1. STOP toute modification
2. Alerter utilisateur : "⚠️ Conflit détecté avec [Cursor/Claude] sur [fichier]"
3. Proposer solutions :
   - Attendre que l'autre termine
   - Travailler sur branche séparée
   - Coordonner via utilisateur
4. NE PAS continuer sans confirmation
```

---

## 💬 PHRASES DE COMMUNICATION STANDARD

### Pour Claude dire à l'utilisateur :

```
⚠️ "Je vois que Cursor a modifié [fichier] récemment.
    Dois-je attendre ou tu veux que je procède ?"

⚠️ "Il y a des changements non-committés sur [fichier].
    Est-ce toi ou Cursor qui travaille dessus ?"

✅ "J'ai terminé mes modifications. Cursor peut maintenant
    intégrer ces changements sans risque de conflit."
```

### Pour Cursor dire à l'utilisateur :

```
⚠️ "Claude a créé de nouveaux fichiers récemment.
    Dois-je lire .cursor/claude-changes.md avant de continuer ?"

⚠️ "Je vois des modifications récentes sur shared/schema.ts.
    Est-ce Claude ou toi qui a fait ça ?"

✅ "J'ai terminé l'intégration des composants de Claude.
    Pas de conflit détecté."
```

---

## 🎯 RÈGLES DE PRIORITÉ

### Qui fait quoi ?

**Claude Code spécialisé dans :**
- Génération de code boilerplate
- Création de nouveaux fichiers (composants, API)
- Refactoring massif multi-fichiers
- Analyse et détection de bugs
- Documentation automatique

**Cursor spécialisé dans :**
- Développement interactif avec preview
- Intégration des composants dans les pages
- Styling et ajustements UI/UX
- Debugging runtime avec preview live
- Modifications fines et itératives

**Éviter doublons :**
- Si Claude a créé un composant → Cursor l'INTÈGRE (ne le recrée pas)
- Si Cursor a créé une page → Claude N'Y TOUCHE PAS (sauf demande explicite)
- Si conflit sur qui fait quoi → Demander à l'utilisateur

---

## 📝 TEMPLATE DE COMMIT MESSAGES

### Format pour Claude :
```
🤖 [CLAUDE] Brève description

- Détails changement 1
- Détails changement 2

Files: file1.ts, file2.tsx
Safe for Cursor: ✅ Yes | ⚠️ Review needed
```

### Format pour Cursor :
```
🎯 [CURSOR] Brève description

- Détails changement 1
- Détails changement 2

Files: file1.ts, file2.tsx
Builds on Claude work: ✅ Yes | ❌ No
```

---

## 🔧 COMMANDES DE SYNCHRONISATION

### Pour Claude vérifier état Cursor :
```bash
git status
cat .ai-coordination/cursor-working.md
git log -1 --author="Cursor" --oneline
```

### Pour Cursor vérifier état Claude :
```bash
git status
cat .ai-coordination/claude-working.md
cat .cursor/claude-changes.md
git log -1 --grep="CLAUDE" --oneline
```

---

## 📖 RÉSUMÉ POUR L'UTILISATEUR

**Tu dois dire :**

### À Claude :
> "Avant de modifier [fichier], vérifie si Cursor travaille dessus.
> Lis .ai-coordination/cursor-working.md et demande-moi confirmation."

### À Cursor :
> "Avant de modifier [fichier], lis .cursor/claude-changes.md
> pour voir ce que Claude a fait récemment."

### Aux deux :
> "Vous DEVEZ vous coordonner via les fichiers .ai-coordination/
> Pas de modifications sans vérification. C'est NON-NÉGOCIABLE."

---

## ⚠️ CONSÉQUENCES SI PROTOCOLE NON RESPECTÉ

1. **Doublons** → Perte de temps (résolution manuelle)
2. **Conflits git** → Code cassé
3. **Écrasement** → Perte de travail
4. **Frustration utilisateur** → 😤

---

## ✅ AVANTAGES SI PROTOCOLE RESPECTÉ

1. **Zéro conflit** → Workflow fluide
2. **Travail parallèle efficace** → Gain de temps
3. **Traçabilité** → Historique clair
4. **Code cohérent** → Qualité maintenue

---

**🔥 RÈGLE D'OR FINALE :**

> **TOUJOURS demander confirmation à l'utilisateur
> en cas de MOINDRE doute sur un conflit potentiel.**

> **Mieux vaut 10 secondes de confirmation
> qu'une heure de résolution de conflits.**

---

**Ce protocole est PERMANENT et PRIORITAIRE.**
**Ne JAMAIS le contourner.**
