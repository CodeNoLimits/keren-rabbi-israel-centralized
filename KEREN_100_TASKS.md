# KEREN RABBI YISRAEL - 100-POINT TASK LIST
## Comprehensive Development Roadmap for haesh-sheli-new.vercel.app
### Based on Yaakov Renne Instructions + Code Audit (Feb 2026)

---

**Legend:**
- **Priority:** P1 = Critical/Blocking, P2 = Important, P3 = Nice-to-have
- **Complexity:** S = Small (<2h), M = Medium (2-8h), L = Large (8h+)
- **Status:** [ ] = Not started, [x] = Done

---

## A. SHOP UX & CONVERSION (Tasks 1-15)

- [x] **1. [P1/M] Quick View Modal for Variant Selection** ✓
  Currently clicking "View Details" navigates to product page. Implement a Quick View modal that opens on "Add to Cart" click, allowing users to select size (Small/Medium/Large) and binding type directly from the store grid. Price updates dynamically. Inspired by Temu. Affects `store.tsx`.

- [x] **2. [P1/S] Make Product Cards Square (Cube Format)** ✓
  Product cards in `store.tsx` use `h-48` for images making them rectangular. Change to 1:1 aspect ratio (square cards) as instructed by Yaakov ("cartes plus CARREES"). Use `aspect-square` or equal width/height. Inspired by "Institutions Rabbi Cook".

- [x] **3. [P1/M] Image Hover Effect on Product Cards** ✓
  When mouse hovers over a product card image in the store grid, the image should change to the second image from the product's `images[]` array. Currently only `hover:opacity-90` exists. Implement smooth crossfade transition between `images[0]` and `images[1]`.

- [x] **4. [P1/S] Add "Add to Cart" Button Directly on Product Cards** ✓
  Store cards only have "View Details" button. Add a second "Add to Cart" button that triggers the Quick View modal (Task 1) or adds default variant. This reduces clicks-to-purchase from 3 to 1.

- [ ] **5. [P2/M] Restore Detailed Product Descriptions and Price Breakdown**
  Some products in `realProducts.ts` have incomplete descriptions. Audit all 43 products, ensure each has: Hebrew description, English description, complete variant pricing, and accurate stock quantities.

- [ ] **6. [P2/M] Coupon/Promo Code System**
  Build coupon functionality: input field at checkout (`checkout.tsx`), server-side validation, percentage/fixed discounts. Yaakov wants personalized promo codes sent by email. Add `coupons` table to `schema.ts`, API endpoints, and UI in checkout flow.

- [x] **7. [P2/S] Product Card Price Display Improvement**
  Currently shows range like "25 NIS - 165 NIS" which is confusing. Show "from X NIS" or show the cheapest variant price prominently with "more options" badge.

- [x] **8. [P2/S] Add "Sale" / "Bestseller" / "New" Badges on Product Cards** ✓
  Use the `isFeatured` field from schema and `originalPrice` from variants to show promotional badges on cards. Visual distinction for featured/discounted items.

- [x] **9. [P3/S] Sort Products by Popularity/Price/Name** ✓
  Store page has no sorting. Add dropdown: "Sort by: Popular, Price Low-High, Price High-Low, Newest, A-Z". Affects `store.tsx` filtered products.

- [x] **10. [P3/S] Infinite Scroll or Pagination for Store**
  All products load at once. With 43+ products, implement pagination (12 per page) or infinite scroll for better performance and UX.

- [x] **11. [P3/S] Product Card Hover Elevation Effect**
  Add subtle card lift/shadow enhancement on hover. Current `hover:shadow-lg` is too subtle. Add `transform: translateY(-8px)` and stronger shadow on hover.

- [x] **12. [P2/S] "Recently Viewed" Section on Store Page**
  Track last 5-10 viewed products in localStorage. Show a horizontal carousel at bottom of store page or product page.

- [x] **13. [P3/S] Product Image Zoom on Click (Lightbox)**
  Yaakov says "when you click on the image, it enlarges". Implement a lightbox/zoom modal on product page images. Currently images just sit in a grid.

- [ ] **14. [P2/M] "Complete Set" Bundle Suggestions**
  When viewing a single volume, suggest the complete set. Group related products (e.g., all Likutei Moharan variants) and show "Buy the Complete Set - Save X%".

- [x] **15. [P3/S] Wishlist Preview Count in Header**
  Header cart widget shows item count. Prepare for favorites (Task 46) by adding a heart icon with count next to the cart in the header.

---

## B. SEARCH & AUTOCOMPLETE (Tasks 16-22)

- [x] **16. [P1/M] Search Autocomplete with Dropdown Suggestions**
  Current search in `store.tsx` is a simple text filter. Implement real autocomplete: as user types "L", show dropdown with "Likutei Moharan", "Likutei Tefilot", "Likutei Halakhot" etc. Inspired by "Mossad HaRav Kook" site. Use `cmdk` library (already in `package.json`).

- [x] **17. [P2/S] Search Highlights in Results** ✓
  When user searches, highlight the matching text in product titles and descriptions within the grid. Bold or color the matched substring.

- [x] **18. [P2/S] Search by Hebrew AND English Names**
  Current search only matches `product.name` (Hebrew) and `description`. Also search `nameEnglish`, `nameFrench`, `nameSpanish`, `nameRussian` fields for multi-language support.

- [x] **19. [P2/S] Fuzzy Search / Typo Tolerance** ✓
  Hebrew keyboard users often make typos. Implement basic fuzzy matching (Levenshtein distance or similar) so "ליקוטי מהורן" still finds "ליקוטי מוהר"ן".

- [x] **20. [P3/S] Search History / Recent Searches** ✓
  Store last 5 searches in localStorage. Show them as suggestions when the search input is focused but empty.

- [x] **21. [P3/S] "No Results" Smart Suggestions** ✓
  When search returns 0 results, suggest related terms or popular products instead of just "No results found".

- [x] **22. [P3/S] Global Search (Not Just Store)** ✓
  Add a search bar in the header that searches across store products, downloads, and pages. Currently search only exists on the store page sidebar.

---

## C. LANGUAGE SELECTOR & i18n (Tasks 23-32)

- [x] **23. [P1/M] Fix Language Selector - Does NOT Work Currently**
  Yaakov explicitly says "Selecteur de langue ne fonctionne PAS actuellement - REPARER". The `LanguageContext` saves to localStorage and the selector UI exists in `Header.tsx`, but the language change does NOT propagate to product data display. Product names, categories, and descriptions remain in Hebrew regardless of selected language.

- [x] **24. [P1/M] Product Names in Selected Interface Language**
  Use `getInterfaceDisplayTitle()` from `bookTitleHelper.ts` (already exists but not used in store page) to show product titles in the user's selected language. Currently `store.tsx` always shows `product.name` (Hebrew).

- [x] **25. [P1/M] Product Descriptions in Selected Language**
  Products have `description` (Hebrew) and `descriptionEnglish` fields. Display the correct description based on `currentLanguage`. Add missing translations for French, Spanish, Russian.

- [ ] **26. [P2/M] Multi-Language Product Grouping**
  Yaakov wants: "Regrouper les versions linguistiques dans une seule fiche produit". Currently Hebrew and English versions of same book are separate products. Create a `parentProductId` or `groupId` system to show language variants under one product card with language tabs.

- [x] **27. [P2/S] Language Filter Should Match Product Language Field** ✓
  Store sidebar has language filter but products use Hebrew language names (e.g., "עברית", "אנגלית"). Ensure filter values display in current interface language and match correctly.

- [x] **28. [P2/S] Category Names Translation**
  Categories like "ספרי רבינו" display in Hebrew regardless of language. Add translated category names to the data or a translation lookup.

- [x] **29. [P2/S] Checkout Page Multi-Language Support** ✓
  `checkout.tsx` is entirely in Hebrew hardcoded. Add language-aware text using `useLanguage()` for all form labels, buttons, error messages.

- [x] **30. [P2/S] Product Page Multi-Language Support**
  `product.tsx` has hardcoded Hebrew text: "בחר גודל וכריכה", "מאפיינים מיוחדים", "מוצרים דומים" etc. Translate all static text using the language context.

- [x] **31. [P3/S] RTL/LTR Auto-Direction Based on Language** ✓
  Most pages set `direction: rtl` for Hebrew. Ensure all pages properly switch to LTR for English, French, Spanish, and Russian. Some pages like `product.tsx` always use RTL.

- [ ] **32. [P3/M] Add Arabic Language Support**
  Given the Israeli market, Arabic is a significant language. Add Arabic translations to the language context and selector.

---

## D. HOMEPAGE CLEANUP (Tasks 33-40)

- [x] **33. [P1/M] Reduce Visual Noise on Homepage**
  Yaakov says: "Reduire la sensation de surcharge (Oness)". Homepage has 7 full sections stacked. Reduce to 4-5 key sections. Remove or collapse redundant CTAs. Keep: Hero, Leading Books, Services, Newsletter, Footer.

- [x] **34. [P1/S] Clean White Background - "Oz VeHadar" Style**
  Yaakov wants: "Fond blanc, lumineux, moderne et epure (inspire Oz VeHadar)". Current homepage uses heavy gradients and colored sections. Simplify to predominantly white with subtle accents.

- [x] **35. [P1/S] Remove Circle Pop-up "Je fais aussi partie du feu"**
  Yaakov says: "Supprimer le pop-up cercle 'Je fais aussi partie du feu' - Remplacer par un bouton lumineux/blanc avec le meme texte". Check for any popup component and replace with a clean CTA button.

- [x] **36. [P2/S] Simplify Hero Section** ✓
  Hero has background image, glass card, oversized heading, quote, and 2 CTAs. Simplify: one clear heading, one subtitle, one CTA button. Remove parallax `backgroundAttachment: 'fixed'` which is janky on mobile.

- [x] **37. [P2/S] Reduce Number of "Click Here" Buttons** ✓
  Categories section has 3 identical "Click Here" buttons all leading to /store. Consolidate into one clear category grid with direct links.

- [x] **38. [P2/S] Improve Leading Books Section**
  Books section shows 6 books with external haesh-sheli.co.il images. Link each to their actual product page (e.g., `/product/likutei-moharan`) instead of generic `/store`. Use local images.

- [x] **39. [P3/S] Lazy Load Homepage Sections** ✓
  Use `IntersectionObserver` to lazy-render sections as user scrolls. Improves initial load time especially with external images.

- [x] **40. [P3/S] Add Testimonials/Reviews Section to Homepage** ✓
  Social proof is missing. Add 3-5 customer testimonials with star ratings. Can be hardcoded initially.

---

## E. FAVORITES SYSTEM (Tasks 41-47)

- [x] **41. [P2/M] Implement Favorites Context (FavoritesContext.tsx)** ✓
  Create a new React context similar to `CartContext.tsx` with: `addFavorite`, `removeFavorite`, `isFavorite`, `favorites[]`. Persist to localStorage keyed by user.

- [x] **42. [P2/S] Heart Icon on Product Cards**
  Add a heart icon (outline when not favorited, filled when favorited) to each product card in the store grid. Click toggles favorite status. Use `lucide-react` Heart icon.

- [x] **43. [P2/S] Heart Icon on Product Detail Page**
  Add favorite toggle button next to product title on `product.tsx`.

- [x] **44. [P2/M] Favorites Page (/favorites)**
  Create a new page showing all favorited products in a grid. Add route to `App.tsx`. Include "Move to Cart" and "Remove" actions.

- [x] **45. [P3/S] Favorites Count Badge in Header** ✓
  Show a small badge on the heart icon in the header with the count of favorited items.

- [x] **46. [P3/S] "Share Favorites" Feature** ✓
  Generate a shareable link or WhatsApp message with the user's favorite books list. Good for gift recommendations.

- [ ] **47. [P3/S] "Compare Products" from Favorites**
  Allow selecting 2-3 favorites and showing a side-by-side comparison table of variants, prices, sizes.

---

## F. IMAGE IMPROVEMENTS (Tasks 48-55)

- [x] **48. [P1/M] Host Product Images Locally**
  Homepage leading books section still loads images from `haesh-sheli.co.il` external domain. Download and host all images locally in `/attached_assets/` for reliability and performance.

- [x] **49. [P1/S] Fix Broken Image Fallback**
  Current error handler: `e.currentTarget.style.display = 'none'` just hides the image. Show a proper placeholder with book icon and product name instead.

- [ ] **50. [P2/M] Image Size Matches Selected Variant**
  Yaakov says: "Images correspondent a la taille du livre selectionne (grande/moyenne/petite)". When user selects a variant size on product page, the displayed image should visually reflect the size difference.

- [ ] **51. [P2/M] AI-Enhanced Book Images - Model A (Improved Lighting)**
  Yaakov wants two image styles. Model A: better lighting, no book stand visible, cleaner background. Process product photos through AI upscaling/enhancement. Store as alternate images.

- [ ] **52. [P2/M] AI-Enhanced Book Images - Model B (Genspark Style)**
  Model B: cleaner, less "kitsch", more professional look. Generate alternate product images with consistent white/neutral backgrounds.

- [ ] **53. [P2/S] Jerusalem/Kotel Background Elements**
  Yaakov mentions: "Elements de maisons pres du Kotel a Jerusalem". Add subtle Jerusalem skyline or Kotel stone texture as background element for hero section or product pages.

- [ ] **54. [P3/M] High-Resolution Image Upscaling**
  Current product images are medium resolution. Use AI upscaling (Let's Enhance.io or similar) to produce 1080p/4K versions for zoom feature and print-ready quality.

- [x] **55. [P3/S] Image Lazy Loading with Blur Placeholder** ✓
  Images already use `loading="lazy"` but there is no blur-up placeholder. Add low-quality image placeholders (LQIP) for smoother loading experience.

---

## G. SEO OPTIMIZATION (Tasks 56-63)

- [x] **56. [P1/M] Add Meta Tags to All Pages**
  No `<meta>` tags for title, description, or Open Graph. Add `react-helmet-async` or equivalent. Each page needs: title, description, og:title, og:description, og:image, canonical URL.

- [x] **57. [P1/S] Add Structured Data (JSON-LD) for Products**
  Add Schema.org Product markup to each product page for rich search results. Include: name, description, image, price, currency, availability, review rating.

- [x] **58. [P1/S] Generate sitemap.xml**
  No sitemap exists. Create a dynamic sitemap listing all pages and product URLs. Submit to Google Search Console.

- [x] **59. [P2/S] Add robots.txt** ✓
  Create `robots.txt` allowing search engine crawling of public pages, blocking admin/checkout pages.

- [x] **60. [P2/S] Semantic HTML Improvements** ✓
  Store page uses generic `<div>` everywhere. Use `<main>`, `<article>`, `<section>`, `<aside>`, `<nav>` for better SEO and accessibility.

- [x] **61. [P2/S] URL Structure for Product Pages** ✓
  Current: `/product/likutei-moharan`. Good slug format. Ensure all product IDs are SEO-friendly slugs (they already are in `realProducts.ts`).

- [x] **62. [P3/S] Alt Text for All Images** ✓
  Product images use `product.name` as alt text. Enhance with descriptive alt text including: book title, author, format, language.

- [x] **63. [P3/M] Hreflang Tags for Multi-Language Pages** ✓
  When language selector works, add `<link rel="alternate" hreflang="x">` tags for each language version of each page. Critical for international SEO.

---

## H. PERFORMANCE OPTIMIZATION (Tasks 64-72)

- [x] **64. [P1/S] Remove Console.log Statements in Production**
  `store.tsx` line 132: `console.log('STORE: Loading...')`. Remove all debug console logs or guard with `import.meta.env.DEV`.

- [x] **65. [P1/M] Optimize Bundle Size**
  `package.json` has many heavy dependencies: recharts, framer-motion, embla-carousel, etc. Audit which are actually used. Tree-shake unused components. Current lazy loading in `App.tsx` is good but verify chunk sizes.

- [ ] **66. [P2/S] Image Optimization Pipeline**
  Convert all product images to WebP format with appropriate sizes (thumbnail 200px, card 400px, full 800px). Use `<picture>` element with srcset.

- [x] **67. [P2/S] Preload Critical Assets** ✓
  Add `<link rel="preload">` for the Google Fonts CSS, logo image, and hero background image to improve LCP.

- [x] **68. [P2/S] Memoize Expensive Computations** ✓
  `filterOptions` in `store.tsx` recalculates on every render. Already uses `useMemo` but ensure dependency arrays are correct. Product data is static so consider moving to module-level constants.

- [x] **69. [P2/S] Service Worker Cache Strategy** ✓
  `sw.js` exists but verify it properly caches: static assets, product images, API responses. Implement stale-while-revalidate for product data.

- [ ] **70. [P3/S] Code-Split Product Data**
  `realProducts.ts` is 2797 lines loaded as a single chunk. Consider splitting into category-based chunks or loading on demand.

- [x] **71. [P3/S] Reduce CSS Bundle - Remove Unused Tailwind Classes** ✓
  Many UI components from shadcn/ui are imported but not all are used. Enable Tailwind purge/content scanning to eliminate dead CSS.

- [ ] **72. [P3/S] Database Query Optimization**
  Schema has proper indexes on sessions. Add indexes on `products.category`, `products.language`, `orders.userId` for faster queries when DB is active.

---

## I. MOBILE RESPONSIVENESS (Tasks 73-80)

- [x] **73. [P1/M] Fix Store Sidebar on Mobile**
  The 320px sidebar (`w-80`) takes up the entire mobile screen. Implement: hide sidebar by default on mobile, show as bottom sheet or overlay when filter button is tapped.

- [x] **74. [P1/S] Product Grid: 1 Column on Mobile, 2 on Tablet**
  Current grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`. On small phones, cards are fine at 1 column but ensure padding and image sizing is optimal.

- [x] **75. [P1/S] Fix Product Page Layout on Mobile**
  `product.tsx` uses `gridTemplateColumns: '1fr 1fr'` which does NOT stack on mobile. Need responsive grid: 1 column on mobile, 2 on desktop.

- [x] **76. [P2/S] Mobile Header Improvements** ✓
  Mobile menu exists but hamburger button has `hover:rotate-90` which is odd on touch. Remove hover transforms on mobile. Ensure language selector is accessible in mobile menu.

- [x] **77. [P2/S] Touch-Friendly Filter Controls** ✓
  Checkboxes and sliders in sidebar are small for touch targets. Increase touch area to minimum 44x44px per WCAG guidelines.

- [x] **78. [P2/S] Swipeable Product Image Gallery** ✓
  Product page image thumbnails need touch swipe support. Use `embla-carousel` (already in dependencies) for mobile image gallery.

- [x] **79. [P3/S] Bottom Navigation Bar on Mobile** ✓
  Add a fixed bottom navigation bar on mobile with: Home, Store, Cart, Favorites, Menu. Common mobile commerce pattern.

- [x] **80. [P3/S] Cart Drawer Width on Mobile** ✓
  `CartWidget.tsx` uses `w-96` (384px) which may overflow on small phones (<375px). Use `w-full max-w-96` for responsive width.

---

## J. PAYMENT INTEGRATION (Tasks 81-86)

- [ ] **81. [P1/M] Stripe Configuration & Testing**
  `checkout.tsx` loads Stripe from `VITE_STRIPE_PUBLIC_KEY` env var. Verify Stripe is configured with ILS currency, test mode works, and webhook endpoints are set up on the server.

- [ ] **82. [P1/M] Israeli Payment Methods Support**
  Add support for common Israeli payment methods: Bit, PayBox, Google Pay, Apple Pay via Stripe Payment Element. The `PaymentElement` component already supports these if configured.

- [ ] **83. [P2/M] Order Confirmation Email**
  Server uses `@sendgrid/mail` (in dependencies). Implement email sending on successful payment: order summary, shipping details, expected delivery date.

- [ ] **84. [P2/S] Installment Payments (Tashlumim)**
  Yaakov mentions "12 payments without interest" on homepage. Implement installment plan display and Stripe's installment support for Israeli credit cards.

- [ ] **85. [P2/S] Order Status Tracking Page**
  Schema has `orders` table with status field. Create `/orders/:id` page for customers to track their order status. Link from confirmation email.

- [ ] **86. [P3/M] PayPal Integration as Alternative**
  Some international customers prefer PayPal. Add PayPal as secondary payment option alongside Stripe.

---

## K. LEGAL PAGES (Tasks 87-91)

- [x] **87. [P1/S] Privacy Policy Page (/privacy)**
  Israeli law requires privacy policy for e-commerce. Create page with: data collection, cookies, payment data handling, GDPR compliance for EU customers.

- [x] **88. [P1/S] Terms of Service Page (/terms)**
  Required for e-commerce. Include: purchase terms, return policy (14 days mentioned in checkout), shipping terms, liability limitations.

- [x] **89. [P1/S] Return & Refund Policy Page (/returns)**
  Israeli consumer protection law mandates clear return policy. Currently mentioned briefly in checkout. Create dedicated page with full details.

- [x] **90. [P2/S] Cookie Consent Banner** ✓
  Site uses localStorage (cart, language) and potentially analytics cookies. Add GDPR/Israeli privacy-compliant cookie consent banner.

- [x] **91. [P2/S] Shipping Policy Page (/shipping)** ✓
  Consolidate all shipping info: free shipping threshold (399 NIS), delivery time (3-7 days), international shipping options, tracking.

---

## L. ANALYTICS & TRACKING (Tasks 92-95)

- [x] **92. [P2/M] Google Analytics 4 Integration** ✓
  No analytics detected in the codebase. Add GA4 with enhanced e-commerce tracking: page views, product views, add-to-cart events, purchases.

- [ ] **93. [P2/S] Facebook Pixel Integration**
  For remarketing and ad optimization. Track: PageView, ViewContent, AddToCart, Purchase events.

- [ ] **94. [P3/S] Hotjar or Microsoft Clarity for Heatmaps**
  Add session recording and heatmap tool to understand user behavior, especially on store and checkout pages.

- [x] **95. [P3/S] Custom Event Tracking** ✓
  Track: language changes, search queries, filter usage, coupon attempts, favorite actions. Store in analytics for business insights.

---

## M. ACCESSIBILITY (Tasks 96-99)

- [x] **96. [P2/M] ARIA Labels and Roles** ✓
  Many interactive elements lack ARIA attributes. Add `aria-label` to icon-only buttons, `role="navigation"` to nav elements, `aria-expanded` to collapsible sidebar sections.

- [x] **97. [P2/S] Keyboard Navigation** ✓
  Ensure all interactive elements (product cards, filters, modals) are keyboard-navigable. Add visible focus indicators. Cart widget and Quick View modal need focus trap.

- [x] **98. [P2/S] Color Contrast Compliance** ✓
  Verify all text meets WCAG AA contrast ratios. Light gray text on white backgrounds (e.g., `text-gray-400` on white) may fail. Check blue links on blue gradient backgrounds.

- [x] **99. [P3/S] Screen Reader Friendly Product Cards** ✓
  Each product card should have a clear screen reader announcement: "Book title, price range, category. Button: View details. Button: Add to favorites."

---

## N. BRANDING & FINAL POLISH (Task 100)

- [x] **100. [P2/M] Branding Consistency: Orange, Blue, White** ✓
  Yaakov specifies: "Concept: Orange, Bleu, Blanc". Current palette is Blue+Teal+Gold. Audit and adjust to Orange (accent/CTA), Blue (primary), White (background). Update CSS variables in `index.css`. LED-style glow effect behind book displays. Conservative but modern feel. Must NOT look AI-generated.

---

## PROGRESS: 75 tasks completed out of 100

## SUMMARY BY PRIORITY

| Priority | Count | Done | Description |
|----------|-------|------|-------------|
| P1       | 28    | ~24  | Critical blockers and core features |
| P2       | 46    | ~6   | Important improvements |
| P3       | 26    | ~0   | Nice-to-have enhancements |

## SUMMARY BY COMPLEXITY

| Complexity | Count | Estimated Time |
|------------|-------|----------------|
| S (Small)  | 62    | <2 hours each |
| M (Medium) | 34    | 2-8 hours each |
| L (Large)  | 4     | 8+ hours each |

## RECOMMENDED EXECUTION ORDER (First 20)

1. Task 23 - Fix Language Selector (P1/M) - BROKEN, client explicitly asked
2. Task 2 - Square Product Cards (P1/S) - Quick visual win
3. Task 3 - Image Hover Effect (P1/M) - Yaakov priority
4. Task 1 - Quick View Modal (P1/M) - Conversion critical
5. Task 33 - Homepage Cleanup (P1/M) - "Oness" complaint
6. Task 34 - White Clean Background (P1/S) - Yaakov priority
7. Task 35 - Remove Circle Pop-up (P1/S) - Explicit instruction
8. Task 16 - Search Autocomplete (P1/M) - Yaakov priority
9. Task 24 - Product Names in Selected Language (P1/M) - i18n fix
10. Task 73 - Fix Store Sidebar on Mobile (P1/M) - UX broken
11. Task 75 - Fix Product Page Mobile Layout (P1/S) - Layout broken
12. Task 56 - Add Meta Tags (P1/M) - SEO baseline
13. Task 48 - Host Images Locally (P1/M) - Reliability
14. Task 49 - Fix Broken Image Fallback (P1/S) - UX polish
15. Task 4 - Add to Cart on Product Cards (P1/S) - Conversion
16. Task 64 - Remove Console.logs (P1/S) - Production cleanup
17. Task 81 - Stripe Configuration (P1/M) - Payment critical
18. Task 87 - Privacy Policy (P1/S) - Legal requirement
19. Task 88 - Terms of Service (P1/S) - Legal requirement
20. Task 89 - Return Policy (P1/S) - Legal requirement

---

*Generated: 2026-02-11 | Project: Keren Rabbi Yisrael | Site: haesh-sheli-new.vercel.app*
*Source: YAAKOV_INSTRUCTIONS.md + Full codebase audit of 18 pages, 6 components, 43 products*
