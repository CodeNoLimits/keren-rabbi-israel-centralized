# CLÉS DE TRADUCTION MANQUANTES - DÉTAIL COMPLET

## Espagnol (es) - Lignes 271-341 LanguageContext.tsx

### Clés Manquantes:
```
├─ downloadLanguage: MANQUANT
│  Location: utilisé dans pages/downloads.tsx (implicite)
│  Traductions existantes:
│    he: 'שפת הורדה'
│    en: 'Download Language'
│    fr: 'Langue de Téléchargement'
│    ru: 'Язык загрузки'
│  Suggestion es: 'Idioma de Descarga'
│
└─ search: MANQUANT
   Location: peut-être dans formulaires/UI
   Traductions existantes:
     he: 'חיפוש'
     en: 'Search'
     fr: 'Recherche'
     ru: 'Поиск'
   Suggestion es: 'Búsqueda'
```

**NOTE:** La clé `search` existe dans en/he/fr mais pas dans es/ru

---

## Russe (ru) - Lignes 342-412 LanguageContext.tsx

### Clés Manquantes:
```
├─ downloadLanguage: MANQUANT
│  Suggestion ru: 'Язык загрузки'
│
├─ search: MANQUANT
│  Suggestion ru: 'Поиск'
│
└─ Anomalie possible ligne 98:
   chat: '💬 Брeslов Чат'  <- "Breslов" au lieu de "Breslov"
   Devrait être: '💬 Брeslов Чат' ou '💬 Брeслов Чат'
```

---

## Fichiers UTILISANT Ces Clés Manquantes

### search
- Probablement dans des UI de recherche
- Utilisé dans formulaires
- Fallback actuellement: renvoie la clé elle-même

### downloadLanguage
- `/pages/downloads.tsx` (supposé)
- Sélecteur de langue pour téléchargement
- Non-traduction = clé affichée à l'utilisateur

---

## ACTION REQUISE

Ajouter dans LanguageContext.tsx:

### Espagnol (es):
```typescript
es: {
  // ...
  downloadLanguage: 'Idioma de Descarga',  // AJOUTER
  search: 'Búsqueda',                        // AJOUTER
  // ...
}
```

### Russe (ru):
```typescript
ru: {
  // ...
  downloadLanguage: 'Язык загрузки',        // AJOUTER
  search: 'Поиск',                          // AJOUTER
  chat: '💬 Breslов Чат',                   // CORRIGER (typo)
  // ...
}
```
