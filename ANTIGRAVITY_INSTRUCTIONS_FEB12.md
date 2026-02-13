# ANTIGRAVITY INSTRUCTIONS - Keren Rabbi Yisrael
## Comprehensive 50-Step Improvement Plan

**Date:** 2026-02-12
**Project:** Keren Rabbi Yisrael - HaEsh Sheli Breslov Books E-Commerce
**Live URL:** https://haesh-sheli-new.vercel.app/
**GitHub:** https://github.com/CodeNoLimits/keren-rabbi-israel-centralized
**Client:** Yaakov Renne (4100510@gmail.com)
**Stack:** React 18 + Vite 5 + Express 4 + Tailwind CSS 3 + Drizzle ORM + Wouter
**Deployment:** Vercel (static SPA via `npm run build:client`, output: `dist/public`)
**Author:** Claude Code Opus 4.6
**Previous work:** 100/100 tasks completed by Claude Sonnet 4.5

---

## CRITICAL CONTEXT

The site has 100/100 feature tasks marked complete, but a **real Lighthouse audit on Feb 12** revealed:
- **Performance: 56/100** (catastrophic -- FCP 10.2s, LCP 14.7s)
- Accessibility: 91/100 (good but 9 errors remain)
- Best Practices: 77/100 (needs work)
- SEO: 92/100 (robots.txt has issues)

The target is **Performance 95+**, **Accessibility 98+**, **Best Practices 95+**, **SEO 100**.

Products: 43 Breslov books across 6 languages (HE, EN, FR, ES, RU, AR).
Payments: Stripe + PayPal integrated (ILS currency).
Client style preferences: Oz VeHadar + Mossad HaRav Kook + Temu inspiration. White, luminous, modern, conservative but not old.

---

## PROJECT FILE STRUCTURE

```
keren-rabbi-israel-centralized/
  client/
    index.html                    # Entry HTML with meta tags, JSON-LD, preloads
    src/
      App.tsx                     # Root component with Router, providers, MetaTags
      main.tsx                    # React entry point
      index.css                   # Global CSS (Tailwind imports)
      pages/
        home.tsx                  # Homepage with hero, carousel, sections
        store.tsx                 # Store page with filters, search, product grid
        product.tsx               # Product detail page
        checkout.tsx              # Checkout with Stripe + PayPal
        favorites.tsx             # Favorites/wishlist page
        legal.tsx                 # Privacy, Terms, Returns pages
        shipping.tsx              # Shipping info page
        order-tracking.tsx        # Order status page
        about.tsx, contact.tsx, blog.tsx, chat.tsx, downloads.tsx, etc.
      components/
        Header.tsx                # Navigation header with language selector
        Footer.tsx                # Site footer
        CartWidget.tsx            # Cart drawer (w-96)
        ProductVariantModal.tsx   # Quick view modal for variant selection
        SearchAutocomplete.tsx    # Search with autocomplete dropdown
        BottomNav.tsx             # Mobile bottom navigation bar
        CookieConsent.tsx         # Cookie consent banner
        WhatsAppFloat.tsx         # WhatsApp floating button
        ChatWidget.tsx            # AI chat widget (Gemini/OpenAI)
        AmbientMusic.tsx          # Background music player
        NewsletterPopup.tsx       # Newsletter subscription popup
        InstallPrompt.tsx         # PWA install prompt
        StripeNotConfiguredFallback.tsx
        SubscriptionCTA.tsx
        ui/                       # shadcn/ui components (40+ files)
      contexts/
        CartContext.tsx            # Shopping cart state
        FavoritesContext.tsx       # Favorites/wishlist state
        LanguageContext.tsx        # i18n with 5 languages + translation function t()
        CurrencyContext.tsx        # Currency conversion
      data/
        products/                 # Product data split into 15 category files
          index.ts                # Re-exports all products as realBreslovProducts
          sefarim-rabbenu.ts, tefilot.ts, likutim.ts, etc.
        downloadLinks.ts
      utils/
        analytics.ts              # GA4 + Facebook Pixel + Clarity
        bookTitleHelper.ts        # getInterfaceDisplayTitle(), getInterfaceCategoryName()
        imagePathHelper.ts        # convertImagePath() for image URL resolution
      hooks/
        use-mobile.tsx, use-toast.ts, useAuth.ts, useCurrency.ts
      lib/
        queryClient.ts, utils.ts, authUtils.ts
  server/
    index.ts                      # Express server entry
    routes.ts                     # API routes (Stripe, PayPal, auth, chat, email)
    emailService.ts               # SendGrid email sending
    storage.ts                    # Database storage layer
    db.ts                         # Neon PostgreSQL connection
    geminiService.ts, openaiService.ts, ragContext.ts
  shared/
    schema.ts                     # Drizzle ORM schema (users, products, orders, coupons, etc.)
  public/
    robots.txt                    # Needs fixing (31 errors reported)
    locales/                      # Locale files
    audio/                        # Audio assets
  attached_assets/                # Product images (Hebrew-named JPGs)
  vite.config.ts                  # Vite config with manual chunks, terser, compression
  vercel.json                     # Vercel SPA config with cache headers
  tailwind.config.ts              # Tailwind config with shadcn/ui theme
  tsconfig.json, package.json
```

---

## 50 NUMBERED STEPS

---

### SECTION 1: PERFORMANCE OPTIMIZATION (Steps 1-10)

---

#### Step 1: Audit and Remove Unused JavaScript Bundles
**Priority:** P0
**Description:** The Lighthouse audit found 245 KiB of unused JavaScript. The main culprits are `recharts` (used only on admin page), `framer-motion` (imported in `store.tsx` globally), and `embla-carousel-react`. These are loaded eagerly even though they are only needed on specific pages. Run `npx vite-bundle-visualizer` to identify exact chunk sizes, then ensure these heavy libraries are only loaded via dynamic imports on the pages that use them.
**Files to modify:**
- `client/src/pages/store.tsx` -- line 3: `import { motion, AnimatePresence } from 'framer-motion'` should become a dynamic import or replaced with CSS animations
- `client/src/App.tsx` -- verify all lazy routes actually code-split properly
- `vite.config.ts` -- review `manualChunks` configuration (lines 64-106), ensure `recharts` and `framer-motion` are not bundled into the main chunk
**Acceptance criteria:** Main bundle JS reduced by at least 150 KiB. Verify with `npm run build:client` and check `dist/public/assets/` file sizes. No chunk larger than 200 KiB gzipped.

---

#### Step 2: Replace Framer Motion with CSS Animations in Store Page
**Priority:** P0
**Description:** `store.tsx` imports `motion` and `AnimatePresence` from `framer-motion` (a 130+ KiB library) for simple fade and slide animations on product cards. Replace these with pure CSS transitions and Tailwind `animate-` classes. The `AnimatePresence` wrapper around the product grid can be replaced with a CSS `opacity` transition. Product card hover effects already use Tailwind classes.
**Files to modify:**
- `client/src/pages/store.tsx` -- remove `import { motion, AnimatePresence } from 'framer-motion'` (line 3), replace `<motion.div>` elements with regular `<div>` using Tailwind transition classes like `transition-all duration-300 ease-in-out`
- `client/src/pages/home.tsx` -- check if framer-motion is imported here too; if so, replace similarly
**Acceptance criteria:** `framer-motion` no longer imported in store.tsx or home.tsx. Animations still visually smooth. Bundle size reduced by ~130 KiB.

---

#### Step 3: Lazy-Load Recharts and Chart Components
**Priority:** P0
**Description:** `recharts` (350+ KiB) is in the `chart-vendor` manual chunk but is only used on admin/analytics pages. Ensure it is never bundled into the main entry. Verify that no page except `admin.tsx` or `yaaakov.tsx` imports from recharts. If `chart.tsx` in `components/ui/` re-exports recharts components, ensure those are only imported lazily.
**Files to modify:**
- `client/src/components/ui/chart.tsx` -- verify it only re-exports and is not imported by any eagerly loaded component
- `client/src/pages/admin.tsx` -- should already be lazy-loaded in App.tsx (line 49: `const Admin = lazy(...)`) -- verify
- `client/src/pages/yaaakov.tsx` -- same verification
- `vite.config.ts` -- keep `'chart-vendor': ['recharts']` in manualChunks
**Acceptance criteria:** Running `npm run build:client` shows recharts in a separate chunk that is NOT loaded on `/`, `/store`, or `/product/:id` pages. Verify in Chrome DevTools Network tab.

---

#### Step 4: Implement Critical CSS Inlining
**Priority:** P0
**Description:** The current `client/index.html` has a small inline `<style>` block (lines 91-105) but it is not sufficient. Extract the critical above-the-fold CSS for the homepage (header, hero section, basic layout) and inline it. This eliminates the 630ms render-blocking CSS request identified by Lighthouse.
**Files to modify:**
- `client/index.html` -- expand the inline `<style>` block (lines 91-105) to include: header background, navigation styles, hero section layout, font-face declarations for the first font weight used
- Consider using `npm install --save-dev critical` or `vite-plugin-critical` to automate extraction
**Acceptance criteria:** First Contentful Paint (FCP) improves by at least 1 second. No visible flash of unstyled content (FOUC). Test by disabling CSS in DevTools and seeing the inline styles render the above-the-fold content.

---

#### Step 5: Optimize Font Loading Strategy
**Priority:** P0
**Description:** `client/index.html` (line 71) loads 4 Google Fonts families (Assistant, Rubik, Inter, Crimson Text) with multiple weights. This is ~200 KiB of font data. The font loading uses `media="print" onload="this.media='all'"` which is good, but the preload on line 88 requests the full CSS again. Reduce to only the 2 fonts actually used (Assistant for Hebrew/RTL, Inter for Latin) with only necessary weights (400, 600, 700).
**Files to modify:**
- `client/index.html` -- lines 71-72: reduce font families from 4 to 2, reduce weights. Remove `Rubik` and `Crimson Text` unless actually used in CSS. Fix duplicate preload on line 88
- `tailwind.config.ts` -- verify `fontFamily.sans` (line 66-68) references match the fonts loaded
- `client/src/index.css` -- check for any `@font-face` or font-family declarations
**Acceptance criteria:** Font CSS file reduced by 50%+. Only Assistant and Inter loaded (or whichever 2 are actually referenced in the CSS). No font fallback flicker visible.

---

#### Step 6: Convert Product Images to WebP with Responsive Sizes
**Priority:** P0
**Description:** The `attached_assets/` directory contains ~50+ JPG product images (Hebrew-named). These are large JPGs served without srcset. Convert all product images to WebP format at 3 sizes: thumbnail (200px wide), card (400px), and full (800px). Use `<picture>` elements or `srcset` attributes. The `imagePathHelper.ts` utility handles path conversion and should be updated to support WebP paths.
**Files to modify:**
- `attached_assets/` -- create WebP versions of all JPG images at 3 sizes (use Sharp or Squoosh CLI)
- `client/src/utils/imagePathHelper.ts` -- update `convertImagePath()` to prefer `.webp` versions and support `srcset`
- `client/src/pages/store.tsx` -- update the `LazyImage` component (lines 20-45) to use `<picture>` with WebP source and JPG fallback
- `client/src/pages/home.tsx` -- same for homepage product images
- `client/src/pages/product.tsx` -- same for product detail page images
**Acceptance criteria:** All product images served as WebP. Total image payload reduced by 60%+. `<picture>` elements with `<source type="image/webp">` used throughout. JPG fallback preserved for old browsers.

---

#### Step 7: Implement Proper Lazy Loading with Intersection Observer
**Priority:** P1
**Description:** The `LazySection` component in `home.tsx` (lines 14-28) uses IntersectionObserver for section-level lazy rendering. However, individual product images in `store.tsx` only use `loading="lazy"` attribute. Implement a proper `IntersectionObserver`-based image loader that starts loading images only when they are within 300px of the viewport, with blur-up LQIP (low quality image placeholder) for smooth transitions.
**Files to modify:**
- `client/src/pages/store.tsx` -- enhance the `LazyImage` component (lines 20-45) to use IntersectionObserver with `rootMargin: '300px'` instead of native `loading="lazy"` for more control
- Generate 20px-wide LQIP versions of product images as base64 data URIs for blur placeholders
**Acceptance criteria:** Images below the fold do not load until user scrolls near them. Blur-up transition visible. Network tab shows images loading progressively as user scrolls.

---

#### Step 8: Add Resource Hints and Preload Critical Assets
**Priority:** P1
**Description:** `client/index.html` has `dns-prefetch` and `preconnect` for Google Fonts (lines 65-68) but is missing preloads for the logo image, hero background, and the main JS chunk. Also, the canonical URL (line 11) points to `haesh-sheli.co.il` instead of the actual deployed URL `haesh-sheli-new.vercel.app`.
**Files to modify:**
- `client/index.html` -- fix canonical URL on line 11 to `https://haesh-sheli-new.vercel.app/`. Add `<link rel="preload">` for the hero image used in `home.tsx`. Add `<link rel="modulepreload">` for the main JS entry point after build. Add preconnect for Stripe (`js.stripe.com`) and PayPal (`www.paypal.com`)
**Acceptance criteria:** Canonical URL points to actual deployed domain. LCP element (hero image or heading) loads faster. No "Preload LCP image" warning in Lighthouse.

---

#### Step 9: Enable Brotli/Gzip Compression Verification
**Priority:** P1
**Description:** `vite.config.ts` (lines 20-33) has `vite-plugin-compression` configured for both Gzip and Brotli in production. However, Vercel's static hosting already applies Brotli automatically. The plugin generates `.gz` and `.br` files in `dist/public/assets/` which Vercel may not serve correctly (it uses its own edge compression). Verify that Vercel is actually serving compressed responses. If not, configure `vercel.json` headers to enable it.
**Files to modify:**
- `vercel.json` -- add compression headers if needed: `"headers": [{ "source": "/(.*)", "headers": [{"key": "Content-Encoding", "value": "br"}] }]` (only if Vercel is not already compressing)
- `vite.config.ts` -- potentially remove `vite-plugin-compression` if Vercel handles it natively (to speed up build time)
**Acceptance criteria:** `curl -H "Accept-Encoding: br" -I https://haesh-sheli-new.vercel.app/` returns `content-encoding: br`. All JS/CSS assets served compressed.

---

#### Step 10: Optimize Vite Build Configuration for Smaller Chunks
**Priority:** P1
**Description:** The current `manualChunks` in `vite.config.ts` (lines 64-106) creates 8 named chunks. Some chunks group libraries that are not always needed together (e.g., `radix-ui-overlay` groups dialog, alert-dialog, popover, tooltip, hover-card -- but hover-card may only be used on one page). Optimize chunk splitting by analyzing actual page dependencies. Also, the `chunkSizeWarningLimit` is set to 1000 (line 60) -- lower this to 250 to catch oversized chunks.
**Files to modify:**
- `vite.config.ts` -- review and refine `manualChunks`. Separate PayPal (`@paypal/react-paypal-js`) into its own chunk since it is only needed on checkout. Move `embla-carousel-react` to only load on product page. Lower `chunkSizeWarningLimit` to 250
- Run `npx vite-bundle-visualizer` after build to visualize chunk graph
**Acceptance criteria:** No individual chunk exceeds 150 KiB gzipped. PayPal and Stripe code only loads on checkout page. Total initial page load JS under 300 KiB.

---

### SECTION 2: VISUAL POLISH (Steps 11-20)

---

#### Step 11: Audit and Match Oz VeHadar Visual Style
**Priority:** P1
**Description:** Yaakov explicitly requested the site look like Oz VeHadar (https://ozvhadar.co.il/) -- clean white backgrounds, minimal visual noise, elegant typography. Currently the homepage in `home.tsx` still has colored gradients and heavy styling. Compare the site visually with Oz VeHadar and note: (a) their use of whitespace, (b) product card design, (c) typography hierarchy, (d) navigation simplicity. Document differences and fix the top 5 discrepancies.
**Files to modify:**
- `client/src/pages/home.tsx` -- simplify hero section, ensure white background dominates, reduce gradient usage
- `client/src/index.css` -- verify CSS custom properties for background colors are pure white (#FFFFFF), not off-white or cream
- `client/src/components/Header.tsx` -- compare navigation density with Oz VeHadar
**Acceptance criteria:** Homepage visual comparison with Oz VeHadar shows similar clean aesthetic. No heavy gradients on main content areas. White background (#FFFFFF) used consistently. David/Yaakov approves visual direction.

---

#### Step 12: Refine Product Card Design for Premium Feel
**Priority:** P1
**Description:** Product cards in `store.tsx` use square aspect ratio (Task 2 completed) and hover effects (Task 3 completed). However, the cards need visual refinement to match premium bookstore aesthetics: subtle border, refined shadow on hover, cleaner price display, and consistent badge positioning. Compare with Mossad HaRav Kook (https://www.ravkook.co.il/) product cards.
**Files to modify:**
- `client/src/pages/store.tsx` -- refine product card markup: use `shadow-sm hover:shadow-xl` transition, add `border border-gray-100` for subtle definition, ensure image container has consistent 1:1 ratio, align price/badge/button spacing
**Acceptance criteria:** Product cards have premium feel with subtle borders, smooth shadow transitions, and consistent spacing. Cards look cohesive whether product has 1 image or multiple.

---

#### Step 13: Improve Typography Hierarchy
**Priority:** P1
**Description:** The site uses 4 font families (Assistant, Rubik, Inter, Crimson Text) loaded in `index.html` but the actual usage across pages is inconsistent. Establish a clear typography hierarchy: primary heading font, body font, and accent font. Hebrew text should use Assistant (designed for Hebrew), Latin text should use Inter.
**Files to modify:**
- `client/src/index.css` -- define clear typographic scale: h1 (2rem/700), h2 (1.5rem/600), h3 (1.25rem/600), body (1rem/400), small (0.875rem/400)
- `client/src/pages/home.tsx` -- ensure heading levels follow semantic hierarchy
- `client/src/pages/store.tsx` -- product titles, prices, and descriptions use consistent font sizes
- `client/src/components/Header.tsx` -- navigation links use consistent weight
**Acceptance criteria:** All headings follow a clear size/weight hierarchy. No more than 2 font families actually used. Typography feels cohesive across all pages.

---

#### Step 14: Polish the Quick View Modal Animation
**Priority:** P1
**Description:** The `ProductVariantModal` component (`client/src/components/ProductVariantModal.tsx`) opens when clicking "Add to Cart" on product cards. The modal should have a smooth entrance animation (fade in + scale up from 95% to 100%) and exit animation. Currently it may appear abruptly if framer-motion is removed.
**Files to modify:**
- `client/src/components/ProductVariantModal.tsx` -- add CSS transition classes for modal entrance/exit: use `transition-all duration-200 ease-out` with `opacity-0 scale-95` to `opacity-100 scale-100`. Ensure backdrop has `backdrop-blur-sm bg-black/40` for premium feel
- If using Radix Dialog (`@radix-ui/react-dialog`), leverage its built-in animation hooks
**Acceptance criteria:** Modal opens with smooth scale+fade animation (200ms). Backdrop dims with blur effect. Modal closes with reverse animation. No jank or layout shift during open/close.

---

#### Step 15: Improve Hero Section Visual Impact
**Priority:** P1
**Description:** The homepage hero in `home.tsx` should be the visual anchor of the site. It needs: (a) a high-quality Jerusalem/Kotel background image (per Yaakov's request, Task 53), (b) a clear headline, (c) one prominent CTA button, (d) subtle parallax or gradient overlay. The hero should be full-width, not contained in a card.
**Files to modify:**
- `client/src/pages/home.tsx` -- refine hero section: use a WebP Jerusalem skyline image as background with `bg-cover bg-center`, add dark overlay gradient (`bg-gradient-to-b from-black/40 to-black/20`), center headline text in white, single CTA button with brand color (#FF6B35)
- Add a Jerusalem/Kotel hero image to `public/images/hero-jerusalem.webp` (download from Unsplash, optimize to under 200 KiB)
**Acceptance criteria:** Hero section is visually striking. Jerusalem background visible through overlay. Headline text clearly readable. CTA button prominently visible. Mobile responsive (stacks properly on 375px).

---

#### Step 16: Standardize Button Styles Across the Site
**Priority:** P2
**Description:** Various pages use different button styles: inline styles in `App.tsx` CheckoutSuccess (lines 247-308), Tailwind classes in `store.tsx`, shadcn/ui `Button` component elsewhere. Standardize all primary, secondary, and ghost buttons using the shadcn/ui Button component variants.
**Files to modify:**
- `client/src/components/ui/button.tsx` -- verify variant definitions (default, secondary, outline, ghost, destructive)
- `client/src/App.tsx` -- replace inline-styled buttons in `CheckoutSuccess` component (lines 247-308) with shadcn/ui Button
- `client/src/pages/home.tsx` -- replace any custom button markup with Button component
- `client/src/pages/store.tsx` -- ensure all buttons use the same component
**Acceptance criteria:** All interactive buttons across the site use the same Button component. Consistent hover/focus/active states. No inline style buttons remain.

---

#### Step 17: Add Subtle Micro-Animations to Interactive Elements
**Priority:** P2
**Description:** Add tasteful micro-animations to improve perceived quality: (a) heart icon fills with animation when favoriting, (b) cart count badge bounces when item added, (c) filter sidebar sections expand smoothly, (d) product cards have gentle scale on hover. All animations should use CSS only (no framer-motion) and respect `prefers-reduced-motion`.
**Files to modify:**
- `client/src/index.css` -- add `@media (prefers-reduced-motion: reduce)` to disable animations for accessibility
- `client/src/pages/store.tsx` -- add `hover:scale-[1.02] transition-transform duration-200` to product card container
- `client/src/components/CartWidget.tsx` -- add bounce animation on cart count change using CSS `@keyframes`
- `client/src/contexts/FavoritesContext.tsx` -- no changes needed, but the heart icon in `store.tsx` should animate fill
**Acceptance criteria:** Micro-animations are subtle and tasteful. Animations disabled for `prefers-reduced-motion`. No animation causes layout shift. Total animation CSS under 2 KiB.

---

#### Step 18: Improve Footer Design
**Priority:** P2
**Description:** The `Footer` component (`client/src/components/Footer.tsx`) should match the premium feel of the rest of the site. It needs: organized columns (About, Quick Links, Legal, Contact), social media icons, newsletter signup, and proper RTL/LTR support.
**Files to modify:**
- `client/src/components/Footer.tsx` -- ensure footer has 4 organized columns on desktop, stacks to 2 then 1 on mobile. Include links to all legal pages (/privacy, /terms, /returns, /shipping). Add brand colors subtly. Ensure all text respects `currentLanguage` from LanguageContext
**Acceptance criteria:** Footer is well-organized, multi-language aware, and visually consistent with the rest of the site. Links to all legal pages present and functional. Mobile layout readable.

---

#### Step 19: Improve Color Contrast for Light Text
**Priority:** P1
**Description:** Lighthouse found 7 color contrast issues. The main problem is light gray text (`text-gray-400`, `text-gray-300`) on white backgrounds failing WCAG AA 4.5:1 ratio. Also check any orange (#FF6B35) text on white backgrounds.
**Files to modify:**
- Search all `.tsx` files for `text-gray-400` and `text-gray-300` on white backgrounds -- change to `text-gray-600` minimum
- `client/src/pages/store.tsx` -- check filter labels and helper text
- `client/src/pages/home.tsx` -- check subtitle text
- `client/src/components/Header.tsx` -- check navigation link colors
- `client/src/components/Footer.tsx` -- check footer text contrast
**Acceptance criteria:** All text meets WCAG AA contrast ratio (4.5:1 for normal text, 3:1 for large text). Zero contrast errors in Lighthouse accessibility audit. Run `npx pa11y https://haesh-sheli-new.vercel.app/` to verify.

---

#### Step 20: Implement Dark/Light Mode Toggle (Optional Enhancement)
**Priority:** P2
**Description:** The `tailwind.config.ts` has `darkMode: ["class"]` configured (line 4), and `next-themes` is in `package.json` dependencies, but no theme toggle exists in the UI. Since the client wants a white/luminous design, dark mode is low priority. However, add a small toggle in the footer or settings menu for users who prefer dark mode.
**Files to modify:**
- `client/src/components/Header.tsx` -- add a small sun/moon icon toggle in the header (desktop only, mobile via menu)
- Ensure all page backgrounds, text colors, and card backgrounds use Tailwind `dark:` variants
- `client/src/index.css` -- ensure CSS custom properties have dark mode alternatives
**Acceptance criteria:** Toggle switches between light and dark modes. Light mode is default and matches Yaakov's white aesthetic requirement. Dark mode is readable and visually consistent. Preference persists in localStorage.

---

### SECTION 3: UX IMPROVEMENTS (Steps 21-30)

---

#### Step 21: Polish Search Autocomplete Dropdown
**Priority:** P1
**Description:** The `SearchAutocomplete` component (`client/src/components/SearchAutocomplete.tsx`) implements search with suggestions. Polish the dropdown: (a) show product thumbnail images alongside text in suggestions, (b) highlight matching characters in bold, (c) show "View all X results" link at the bottom, (d) keyboard navigation (up/down arrows) through suggestions.
**Files to modify:**
- `client/src/components/SearchAutocomplete.tsx` -- add product image thumbnails (small, 40x40px) in suggestion rows. Ensure keyboard arrow navigation works. Add "View all results" footer link that navigates to `/store?search=query`
**Acceptance criteria:** Search dropdown shows product images. Arrow keys navigate suggestions. Enter key on suggestion navigates to product. "View all results" link works. Dropdown closes on click outside.

---

#### Step 22: Improve Variant Modal UX with Size Visualization
**Priority:** P1
**Description:** The `ProductVariantModal` shows size options (Small, Medium, Large, Extra Large) but the user cannot visualize the actual size difference. Task 50 implemented dynamic image scaling, but the modal should also show dimension text (e.g., "12x8 cm") clearly for each variant and highlight the price difference between sizes.
**Files to modify:**
- `client/src/components/ProductVariantModal.tsx` -- ensure each variant button shows: size name, dimensions (`variant.dimensions`), price, and volumes count. Use a visual size indicator (like proportional rectangles) to represent physical book size
**Acceptance criteria:** Each size variant clearly shows its dimensions and price. Selected variant is visually distinct. Price updates dynamically when variant changes. User can see at a glance which is the best value.

---

#### Step 23: Add Smooth Page Transitions
**Priority:** P2
**Description:** Currently page navigation (via `wouter`) causes an instant content swap. Add subtle fade transitions between pages. Since `wouter` is lightweight and does not have built-in transitions, use a simple CSS opacity transition on the route container.
**Files to modify:**
- `client/src/App.tsx` -- wrap the `<Router />` component output in a `<div>` with CSS transition. When route changes, briefly animate opacity from 1 to 0 and back to 1. Keep transitions under 200ms to avoid feeling sluggish
**Acceptance criteria:** Page transitions feel smooth, not abrupt. Transition duration is 150-200ms. No layout shift during transition. Back/forward browser navigation also transitions smoothly.

---

#### Step 24: Implement Persistent Cart Across Sessions
**Priority:** P1
**Description:** `CartContext.tsx` stores cart state. Verify that cart data persists to `localStorage` and survives page reload and browser restart. Also ensure cart items display correctly after the product data loads (product IDs must match between cart and `realBreslovProducts`).
**Files to modify:**
- `client/src/contexts/CartContext.tsx` -- verify `localStorage` serialization/deserialization. Ensure cart items include enough data (productId, variantId, name, price, image, quantity) to render without needing to fetch product data again. Add cart expiration (e.g., 7 days)
**Acceptance criteria:** Add items to cart, close browser, reopen -- cart still shows items. Cart badge count in header persists. Cart handles edge case where a product is removed from catalog (show "item no longer available" instead of crashing).

---

#### Step 25: Add "Recently Viewed" Carousel to Product Pages
**Priority:** P2
**Description:** Task 12 implemented "Recently Viewed" on the store page. Extend this to the product detail page (`product.tsx`): show a horizontal scrollable carousel at the bottom with the last 5-10 viewed products. This helps with cross-selling and keeps users engaged.
**Files to modify:**
- `client/src/pages/product.tsx` -- add a "Recently Viewed" section below product details. Read from localStorage. Use a horizontal scroll container with `overflow-x-auto snap-x` for smooth scroll-snap behavior
**Acceptance criteria:** Product page shows up to 8 recently viewed products in a horizontal carousel. Current product is excluded from the list. Clicking a recently viewed product navigates to it. Works on mobile with touch scrolling.

---

#### Step 26: Improve Favorites Page Empty State
**Priority:** P2
**Description:** The favorites page (`favorites.tsx`) should have an engaging empty state when no favorites are saved. Show a heart illustration, a message encouraging the user to browse, and a direct link to the store.
**Files to modify:**
- `client/src/pages/favorites.tsx` -- add an empty state component with: large heart outline icon (from lucide-react), multi-language message using `useLanguage().t()`, and a prominent "Browse Store" button linking to `/store`
**Acceptance criteria:** Empty favorites page shows a clear, friendly message. CTA button links to store. Message is translated in all 6 languages. Visual is appealing, not just text.

---

#### Step 27: Add "Back to Top" Floating Button
**Priority:** P2
**Description:** Long pages (store with 43 products, legal pages) need a "back to top" button that appears after scrolling down 500px. Use a smooth scroll animation. Button should not interfere with the WhatsApp floating button or mobile bottom navigation.
**Files to modify:**
- Create logic in `client/src/App.tsx` or a new small component -- floating button appears after 500px scroll, positioned bottom-right (above WhatsApp button), smooth-scrolls to top on click. Hide on mobile where BottomNav is visible (since BottomNav includes "Home")
**Acceptance criteria:** Button appears after scrolling 500px down. Clicking scrolls smoothly to top. Button does not overlap WhatsApp button or BottomNav. Hidden on mobile if BottomNav is showing.

---

#### Step 28: Improve Cart Widget Responsiveness
**Priority:** P1
**Description:** The `CartWidget` (`client/src/components/CartWidget.tsx`) uses `w-96` (384px) which can overflow on phones narrower than 384px. Task 80 noted to use `w-full max-w-96`. Verify this is implemented. Also improve the cart item layout: show product image, name (in current language), variant details, price, quantity controls, and remove button clearly.
**Files to modify:**
- `client/src/components/CartWidget.tsx` -- ensure `w-full max-w-96` is used instead of fixed `w-96`. Product images should be 60x60px thumbnails. Quantity +/- buttons should be at least 44x44px touch targets. Show subtotal at bottom with clear "Checkout" button
**Acceptance criteria:** Cart widget does not overflow on 375px screens. All touch targets are at least 44x44px. Product names display in current interface language. Cart is scrollable if many items. Checkout button is always visible.

---

#### Step 29: Add Animated "Added to Cart" Feedback
**Priority:** P2
**Description:** When a user adds an item to cart (via Quick View modal or direct button), provide clear visual feedback: (a) a brief green checkmark animation on the button, (b) the cart badge in the header bounces, (c) a toast notification confirms the addition. The toast is already available via `use-toast.ts` hook.
**Files to modify:**
- `client/src/components/ProductVariantModal.tsx` -- the "Add to Cart" button should show a checkmark icon for 1.5 seconds after click, then revert. Use state toggle
- `client/src/pages/store.tsx` -- same for direct "Add to Cart" button on product cards
- `client/src/components/CartWidget.tsx` -- cart icon in header should briefly animate (scale bounce) when items count changes
**Acceptance criteria:** User gets 3 feedback signals when adding to cart: button state change, header badge animation, and toast notification. Feedback is not overwhelming (subtle and quick).

---

#### Step 30: Implement Smooth Scroll for Anchor Links
**Priority:** P2
**Description:** The homepage has multiple sections. Navigation links in the header (like "About", section anchors) should smooth-scroll to the relevant section rather than jumping. Also, the "back to top" button (Step 27) and any in-page navigation should use smooth scrolling.
**Files to modify:**
- `client/src/index.css` -- add `html { scroll-behavior: smooth; }` globally
- `client/src/pages/home.tsx` -- if any section has anchor IDs, ensure header links use `href="#section-id"` for in-page navigation
**Acceptance criteria:** All in-page navigation uses smooth scrolling. `scroll-behavior: smooth` applied globally. No jarring jumps when clicking anchor links. Works on both desktop and mobile.

---

### SECTION 4: SEO & ACCESSIBILITY (Steps 31-40)

---

#### Step 31: Fix robots.txt Syntax Errors
**Priority:** P0
**Description:** Lighthouse reported 31 errors in `public/robots.txt`. The current file (60 lines) has several issues: (a) `Crawl-delay` is not supported by Google (line 37), (b) `/*.json$` regex pattern is not standard robots.txt syntax (line 18), (c) blocking AhrefsBot/SemrushBot is debatable (may prevent useful SEO analysis). Also, the Sitemap directive is commented out (line 34).
**Files to modify:**
- `public/robots.txt` -- remove `Crawl-delay: 1` (line 37), fix `/*.json$` to `/api/` (already covered), uncomment Sitemap line and point to `https://haesh-sheli-new.vercel.app/sitemap.xml`. Remove individual bot rules for cleaner file. Keep it simple: allow all except /admin, /checkout, /api, /orders
**Acceptance criteria:** robots.txt passes Google's robots.txt tester (https://search.google.com/test/robots-testing-tool). No syntax errors. Sitemap URL declared. File is under 20 lines.

---

#### Step 32: Generate Dynamic sitemap.xml
**Priority:** P0
**Description:** No sitemap.xml exists (Task 58 marked done but the Sitemap line in robots.txt is commented out). Generate a static `sitemap.xml` containing all public URLs: homepage, store, all 43 product pages (e.g., `/product/likutei-moharan`), about, contact, legal pages, etc. Place in `public/` so Vercel serves it statically.
**Files to modify:**
- Create `public/sitemap.xml` -- include all product URLs from the `data/products/index.ts` file. Each `<url>` entry needs `<loc>`, `<lastmod>` (use 2026-02-12), `<changefreq>` (weekly for products, monthly for legal), and `<priority>` (1.0 for homepage, 0.8 for store/products, 0.5 for legal)
- `public/robots.txt` -- uncomment and update Sitemap line
**Acceptance criteria:** `https://haesh-sheli-new.vercel.app/sitemap.xml` returns valid XML. All 43 product URLs included. Validate with https://www.xml-sitemaps.com/validate-xml-sitemap.html. Robots.txt references it.

---

#### Step 33: Add JSON-LD Product Schema to Product Pages
**Priority:** P1
**Description:** `client/index.html` has a JSON-LD `Store` schema (lines 40-62), but individual product pages (`product.tsx`) need `Product` schema with: name, description, image, price, currency (ILS), availability, review rating, SKU, brand. This enables rich snippets in Google search results.
**Files to modify:**
- `client/src/pages/product.tsx` -- add a `<script type="application/ld+json">` tag in a `useEffect` that generates Product schema from the loaded product data. Include `offers.price`, `offers.priceCurrency: "ILS"`, `offers.availability: "InStock"`, `brand.name: "Keren Rabbi Yisrael"`. Remove on component unmount
**Acceptance criteria:** Each product page has valid JSON-LD Product schema. Test with Google Rich Results Test (https://search.google.com/test/rich-results). Product name, price, and availability appear in structured data.

---

#### Step 34: Fix Canonical URL Inconsistency
**Priority:** P0
**Description:** `client/index.html` line 11 has `<link rel="canonical" href="https://haesh-sheli.co.il/">` which points to the OLD domain. The actual deployed site is at `haesh-sheli-new.vercel.app`. Also, the `MetaTags` component in `App.tsx` (line 448) uses `const base = 'https://haesh-sheli-new.vercel.app'` which is correct. This inconsistency confuses search engines.
**Files to modify:**
- `client/index.html` -- line 11: change canonical to `https://haesh-sheli-new.vercel.app/`
- `client/index.html` -- lines 14-19: update all hreflang `href` values from `haesh-sheli.co.il` to `haesh-sheli-new.vercel.app`
- `client/index.html` -- lines 24-25: update og:url from `haesh-sheli.co.il` to `haesh-sheli-new.vercel.app`
**Acceptance criteria:** All URLs in `index.html` point to `haesh-sheli-new.vercel.app`. No references to old `haesh-sheli.co.il` domain remain in the HTML. Google Search Console shows correct canonical URL.

---

#### Step 35: Add aria-labels to All Icon-Only Buttons
**Priority:** P0
**Description:** Lighthouse found 2 buttons without accessible names. Icon-only buttons (hamburger menu, close buttons, heart icons, cart icon, search icon) need `aria-label` attributes. The `BottomNav.tsx` nav items, `Header.tsx` mobile menu toggle, and `CartWidget.tsx` close button are likely culprits.
**Files to modify:**
- `client/src/components/Header.tsx` -- add `aria-label="Open menu"` (or Hebrew equivalent based on language) to the hamburger menu button. Add `aria-label="Close menu"` to close button
- `client/src/components/CartWidget.tsx` -- add `aria-label="Close cart"` to close button, `aria-label="Open cart"` to cart trigger
- `client/src/components/BottomNav.tsx` -- add `aria-label` to each nav icon button
- `client/src/pages/store.tsx` -- add `aria-label` to favorite heart buttons and filter toggle button
**Acceptance criteria:** Zero "Buttons do not have an accessible name" errors in Lighthouse. All icon-only buttons have descriptive `aria-label`. Labels are in the current interface language using `useLanguage().t()`.

---

#### Step 36: Add ARIA Landmarks and Roles
**Priority:** P1
**Description:** Pages should use proper ARIA landmarks: `<header role="banner">`, `<main role="main">`, `<nav role="navigation">`, `<footer role="contentinfo">`. The `Header.tsx` should wrap its nav in `<nav>`, each page content should be in `<main>`, and the `Footer.tsx` should use `<footer>`.
**Files to modify:**
- `client/src/components/Header.tsx` -- ensure top-level element is `<header>` with `role="banner"`, navigation is in `<nav role="navigation">`
- `client/src/components/Footer.tsx` -- ensure top-level element is `<footer>` with `role="contentinfo"`
- `client/src/pages/home.tsx`, `store.tsx`, `product.tsx`, etc. -- wrap page content in `<main role="main">`. Each section should use `<section>` with `aria-labelledby` pointing to its heading
**Acceptance criteria:** Each page has exactly one `<main>` landmark. Header uses `<header>` and `<nav>`. Footer uses `<footer>`. Screen reader navigation by landmarks works correctly. Lighthouse accessibility score 95+.

---

#### Step 37: Implement Focus Trap in Modals
**Priority:** P1
**Description:** The `ProductVariantModal` and `CartWidget` (which acts as a drawer/modal) need focus trapping: when open, Tab key should cycle through interactive elements within the modal only, not reach elements behind it. Also ensure pressing Escape closes the modal.
**Files to modify:**
- `client/src/components/ProductVariantModal.tsx` -- if using Radix Dialog (`@radix-ui/react-dialog`), focus trapping is built-in. If using custom modal, add `onKeyDown` handler for Escape and implement focus trap using `document.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')` within the modal
- `client/src/components/CartWidget.tsx` -- same focus trap implementation for cart drawer
**Acceptance criteria:** When modal is open, Tab cycles only through modal elements. Escape key closes modal. Focus returns to the trigger element after closing. Screen reader announces modal opening.

---

#### Step 38: Add Skip-to-Content Link
**Priority:** P1
**Description:** Keyboard users need a "Skip to main content" link that appears on first Tab press, allowing them to bypass the navigation header. This is a WCAG 2.1 Level A requirement.
**Files to modify:**
- `client/src/App.tsx` -- add a visually-hidden-but-focusable link before `<Router />`: `<a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:p-4 focus:rounded focus:shadow-lg">Skip to content</a>`
- Each page's `<main>` element should have `id="main-content"`
**Acceptance criteria:** Pressing Tab on page load reveals "Skip to content" link. Clicking it moves focus to main content area. Link is invisible until focused. Works on all pages.

---

#### Step 39: Add Language Attribute for Mixed-Language Content
**Priority:** P2
**Description:** Product names exist in multiple languages within the same page. When the interface language is English but a product title falls back to Hebrew, the Hebrew text should have `lang="he"` attribute for screen readers to pronounce it correctly. Similarly, Arabic text needs `lang="ar"`.
**Files to modify:**
- `client/src/utils/bookTitleHelper.ts` -- modify `getInterfaceDisplayTitle()` to also return the language code of the returned title, so the calling component can set `lang` attribute
- `client/src/pages/store.tsx` -- when rendering product titles, if the title language differs from the interface language, wrap in `<span lang="he">` (or appropriate code)
**Acceptance criteria:** Mixed-language content has appropriate `lang` attributes. Screen readers switch pronunciation for Hebrew vs Latin text. HTML validator shows no language mismatch warnings.

---

#### Step 40: Ensure All Images Have Descriptive Alt Text
**Priority:** P1
**Description:** Task 62 added alt text using `product.name`, but this is often just the Hebrew title. Enhance alt text to be descriptive: include the book title, author, format, and language. Example: `"Likutei Moharan - Rabbi Nachman of Breslov - Hebrew Edition - Hardcover"`.
**Files to modify:**
- `client/src/pages/store.tsx` -- update alt text in `LazyImage` to use format: `${getInterfaceDisplayTitle(product, currentLanguage)} - ${product.author || 'Rabbi Nachman'} - ${product.language}`
- `client/src/pages/product.tsx` -- same for product detail images, include variant info if applicable
- `client/src/pages/home.tsx` -- hero image and featured product images need descriptive alt text
**Acceptance criteria:** All images have alt text longer than just the product name. Alt text includes author and language at minimum. Decorative images have `alt=""`. Lighthouse accessibility audit passes with 0 image alt warnings.

---

### SECTION 5: PAYMENT FLOW TESTING (Steps 41-45)

---

#### Step 41: Verify Stripe Test Mode End-to-End
**Priority:** P0
**Description:** Stripe integration is in `server/routes.ts` and `client/src/pages/checkout.tsx`. Verify the complete flow: add to cart -> checkout page -> enter test card (4242424242424242) -> payment succeeds -> redirect to `/checkout/success` -> order confirmation email sent. Ensure the `STRIPE_SECRET_KEY` and `VITE_STRIPE_PUBLIC_KEY` environment variables are correctly set in Vercel.
**Files to modify:**
- `client/src/pages/checkout.tsx` -- verify Stripe Payment Element renders correctly. Test with card number `4242 4242 4242 4242`, any future expiry, any CVC
- `server/routes.ts` -- verify `/api/create-payment-intent` creates intent with correct amount in agorot (ILS cents). Verify webhook handler at `/api/stripe-webhook` or `/api/webhooks/stripe`
- `vercel.json` or Vercel dashboard -- verify environment variables are set
**Acceptance criteria:** Full Stripe test payment flow works end-to-end on the deployed site. Payment intent created with correct ILS amount. Success page shows with order number. Webhook fires successfully.

---

#### Step 42: Verify PayPal Sandbox End-to-End
**Priority:** P0
**Description:** PayPal integration uses `@paypal/react-paypal-js` in `checkout.tsx` and server routes at `/api/paypal/create-order` and `/api/paypal/capture-order` in `routes.ts` (lines 11-32 show PayPal config). Test the complete PayPal sandbox flow. Ensure `PAYPAL_CLIENT_ID` and `PAYPAL_CLIENT_SECRET` are set.
**Files to modify:**
- `client/src/pages/checkout.tsx` -- verify PayPal buttons render alongside Stripe option. Test with sandbox buyer account
- `server/routes.ts` -- verify `getPayPalAccessToken()` works, `/api/paypal/create-order` creates order with ILS amount, `/api/paypal/capture-order` captures payment
**Acceptance criteria:** PayPal sandbox payment completes successfully. Order created with correct amount. Payment captured. User redirected to success page. Both Stripe and PayPal options visible on checkout.

---

#### Step 43: Test Order Confirmation Emails
**Priority:** P1
**Description:** `server/emailService.ts` uses `@sendgrid/mail` to send order confirmation emails. Verify: (a) SendGrid API key is configured, (b) email template includes order summary, items, shipping address, and estimated delivery, (c) email renders correctly in both Hebrew and English, (d) from address is legitimate.
**Files to modify:**
- `server/emailService.ts` -- verify `sendOrderConfirmation()` function generates correct email content. Check that it uses the customer's language preference. Ensure email includes: order number, items with prices, shipping address, total amount, estimated delivery (3-7 days)
- Verify `SENDGRID_API_KEY` is set in Vercel environment variables
**Acceptance criteria:** Order confirmation email is received after successful payment. Email content is accurate and well-formatted. Email works in Hebrew and English. No spam filter issues (check SPF/DKIM records).

---

#### Step 44: Test Coupon Code Application
**Priority:** P1
**Description:** Task 6 implemented coupon functionality. The `coupons` table in `shared/schema.ts` (lines 307-323) supports percentage and fixed discounts. Verify: coupon input exists on checkout page, server validates coupon code, discount is applied correctly to order total, expired/invalid coupons show error messages.
**Files to modify:**
- `client/src/pages/checkout.tsx` -- verify coupon input field exists and sends code to server for validation
- `server/routes.ts` -- verify `/api/coupons/validate` (or similar) endpoint checks code against database, validates expiry/usage limits, returns discount amount
- Test with sample coupon codes (create test coupons in database if needed)
**Acceptance criteria:** Valid coupon reduces order total. Expired coupon shows error message. Invalid code shows "coupon not found". Discount appears in order summary. Coupon usage count increments after successful order.

---

#### Step 45: Test Cart Edge Cases
**Priority:** P1
**Description:** Verify cart handles edge cases: (a) adding same product twice increases quantity, (b) removing last item shows empty cart state, (c) changing variant after adding to cart updates correctly, (d) maximum quantity limit (e.g., 10 per item), (e) cart total calculates correctly with multiple items and variants at different prices.
**Files to modify:**
- `client/src/contexts/CartContext.tsx` -- verify `addItem()` handles duplicate detection (same product + same variant), quantity increment, and max quantity. Verify `removeItem()` and `updateQuantity()` work correctly
- `client/src/components/CartWidget.tsx` -- verify empty cart shows friendly message with link to store
**Acceptance criteria:** Adding same variant twice increases quantity instead of creating duplicate. Removing all items shows empty state. Cart total is mathematically correct. Quantity cannot exceed reasonable max (10). Cart items show variant details (size, binding).

---

### SECTION 6: PRE-LAUNCH QA (Steps 46-50)

---

#### Step 46: Cross-Browser Testing (Chrome, Firefox, Safari, Edge)
**Priority:** P0
**Description:** Test the entire site on all 4 major browsers. Key areas to verify: (a) product grid renders correctly, (b) modals open/close properly, (c) checkout flow works, (d) fonts render correctly, (e) RTL layout is correct in Hebrew mode, (f) LTR layout is correct in English mode.
**Files to modify:** No code changes expected -- this is a testing step. Document any browser-specific bugs found and fix them.
**Acceptance criteria:** Site works correctly on Chrome 120+, Firefox 120+, Safari 17+, Edge 120+. No visual glitches. All interactive elements work. RTL/LTR correct in all browsers. Document any known issues.

---

#### Step 47: Mobile Testing on Real Devices
**Priority:** P0
**Description:** Test on actual mobile devices (or accurate emulators) at key breakpoints: iPhone SE (375px), iPhone 14 (390px), Samsung Galaxy S21 (360px), iPad (768px). Verify: (a) bottom navigation bar works, (b) product grid is 1 column on phone, (c) cart drawer does not overflow, (d) checkout form is usable, (e) touch targets are at least 44x44px.
**Files to modify:** No code changes expected unless bugs found. Use Chrome DevTools device emulation as minimum.
- `client/src/components/BottomNav.tsx` -- verify it shows on mobile only and does not overlap page content
- `client/src/pages/checkout.tsx` -- verify form inputs are large enough for mobile
**Acceptance criteria:** Zero horizontal scroll on any mobile viewport. All buttons tappable without misclicks. Keyboard does not obscure form inputs. BottomNav visible and functional. Product images load and display correctly.

---

#### Step 48: RTL/LTR Layout Verification
**Priority:** P0
**Description:** Hebrew and Arabic use RTL layout; English, French, Spanish, Russian use LTR. Verify that switching languages via the language selector correctly flips: (a) page direction, (b) text alignment, (c) flex/grid order, (d) navigation position, (e) form input alignment. The `MetaTags` component in `App.tsx` (line 507) sets `document.documentElement.dir` based on language.
**Files to modify:**
- `client/src/App.tsx` -- verify `MetaTags` component handles Arabic (`ar`) in addition to Hebrew for RTL (line 507 currently only checks `currentLanguage === 'he'`)
- `client/src/pages/store.tsx` -- verify filter sidebar appears on correct side (right for RTL, left for LTR)
- `client/src/components/CartWidget.tsx` -- verify cart drawer slides from correct side
- `client/src/pages/checkout.tsx` -- verify form layout flips correctly
**Acceptance criteria:** All 6 languages display with correct text direction. No overlapping elements when switching RTL/LTR. Form labels align with their inputs. Navigation reads in correct order. Test by switching between Hebrew and English rapidly.

---

#### Step 49: Error Boundary and Fallback UI Implementation
**Priority:** P1
**Description:** The app needs React Error Boundaries to prevent white screen crashes. If a product page fails to load or a component throws, show a friendly error message instead of crashing the entire app. Currently there is no Error Boundary visible in the codebase.
**Files to modify:**
- Create error boundary logic (can be in `client/src/App.tsx` or a separate component) -- wrap `<Router />` in an Error Boundary that catches render errors and shows a multi-language "Something went wrong" message with a "Go to Homepage" button
- `client/src/pages/product.tsx` -- add error handling for when product ID is not found in `realBreslovProducts` (show "Product not found" page instead of crashing)
- `client/src/pages/not-found.tsx` -- verify it has a friendly design with navigation back to store
**Acceptance criteria:** Navigating to `/product/nonexistent-id` shows a "Product not found" page, not a crash. JavaScript errors in components show fallback UI, not white screen. Error boundary logs errors for debugging.

---

#### Step 50: Final Lighthouse Audit and Deploy
**Priority:** P0
**Description:** After completing steps 1-49, run a final Lighthouse audit to verify scores meet targets. Fix any remaining issues. Then deploy to Vercel and verify production build.
**Files to modify:** All files modified in previous steps should be committed.
- Run: `npm run build:client` to verify clean build
- Run Lighthouse in Chrome DevTools (Incognito, mobile emulation, performance throttling)
- Fix any remaining warnings or errors
- Deploy: `git add . && git commit -m "Performance and UX improvements" && git push`
**Acceptance criteria:**
- Performance: 95+ (previously 56)
- Accessibility: 98+ (previously 91)
- Best Practices: 95+ (previously 77)
- SEO: 100 (previously 92)
- FCP under 1.8 seconds
- LCP under 2.5 seconds
- Speed Index under 3.4 seconds
- TTI under 3.8 seconds
- CLS: 0
- TBT under 200ms
- All automated Lighthouse audits pass
- Production URL loads correctly on mobile and desktop

---

## EXECUTION PRIORITY ORDER

Execute in this order for maximum impact with minimum effort:

### Phase 1: Critical Performance (4 hours, expected +30 points)
Steps: **1, 2, 3, 5, 6, 31, 34, 35**

### Phase 2: Visual & UX Polish (3 hours, expected +10 points)
Steps: **4, 8, 11, 12, 13, 15, 19**

### Phase 3: SEO & Accessibility (2 hours, expected +8 points)
Steps: **32, 33, 36, 37, 38, 40**

### Phase 4: Payment & QA (2 hours, verification)
Steps: **41, 42, 43, 46, 47, 48**

### Phase 5: Polish & Deploy (1 hour)
Steps: **14, 16, 49, 50**

### Phase 6: Nice-to-Have (as time permits)
Steps: **7, 9, 10, 17, 18, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 39, 44, 45**

---

## ENVIRONMENT VARIABLES NEEDED ON VERCEL

```
VITE_STRIPE_PUBLIC_KEY=pk_test_...  or pk_live_...
STRIPE_SECRET_KEY=sk_test_...  or sk_live_...
PAYPAL_CLIENT_ID=...
PAYPAL_CLIENT_SECRET=...
SENDGRID_API_KEY=SG.xxx
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_FB_PIXEL_ID=XXXXXXXXXX
VITE_CLARITY_ID=XXXXXXXXXX
DATABASE_URL=postgres://...  (Neon PostgreSQL)
```

---

## BUILD & DEPLOY COMMANDS

```bash
# Install dependencies
npm install

# Development
npm run dev

# Production build (client only -- Vercel uses this)
npm run build:client

# Full build (client + server)
npm run build

# Analyze bundle
npm run build:analyze

# Run tests
npm run test
```

---

## KEY TECHNICAL NOTES

1. **Routing:** Uses `wouter` (lightweight, ~1.3 KiB), NOT React Router. Route definitions in `App.tsx` lines 317-440.
2. **State:** No Redux/Zustand. Context API only: `CartContext`, `FavoritesContext`, `LanguageContext`, `CurrencyContext`.
3. **Styling:** Tailwind CSS 3.4 with shadcn/ui component library (40+ components in `client/src/components/ui/`).
4. **Product Data:** Static in-memory data in `client/src/data/products/` (15 category files, re-exported from `index.ts`). NOT fetched from API. Type: `Product` from `shared/schema.ts`.
5. **Images:** Product images in `attached_assets/` with Hebrew filenames. Served via Express static middleware and also accessible in Vite dev via `@assets` alias.
6. **i18n:** Custom implementation in `LanguageContext.tsx`. Translation function `t(key)` with translations object. Product-level translations via `bookTitleHelper.ts`.
7. **Database:** Drizzle ORM + Neon PostgreSQL. Schema in `shared/schema.ts`. Tables: users, sessions, products, orders, orderItems, coupons, shippingRates, paymentTransactions, subscriptionPlans.
8. **Payments:** Stripe (primary) + PayPal (secondary). Both server-side in `server/routes.ts`.
9. **Analytics:** GA4 + Facebook Pixel + Microsoft Clarity. All in `client/src/utils/analytics.ts`. Env-gated.
10. **Deployment:** Vercel static SPA. `vercel.json` routes all non-file requests to `index.html`. Cache headers for assets (1 year immutable).

---

*Prepared by Claude Code Opus 4.6 -- 2026-02-12*
*For execution by Anti-Gravity AI (Windsurf/Gemini)*
*Project: Keren Rabbi Yisrael -- https://haesh-sheli-new.vercel.app/*
