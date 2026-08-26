# BIDRI CRAFTS — Luxury Heritage Commerce Maison

> *"A museum in the morning light — black metal, pure silver, and an enormous amount of empty white."*

BIDRI CRAFTS is a production-ready luxury e-commerce experience celebrating authentic Bidriware — the 14th-century zinc-and-silver inlay metal craft of Bidar, Karnataka (GI-tagged since 1422).

---

## 1. Technology Stack

- **Framework**: Next.js 15 (App Router, Static Site Generation for all 59 routes)
- **Language**: TypeScript 5.7 (Strict mode)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/postcss`, bespoke design tokens)
- **Choreography & Motion**: Framer Motion (`framer-motion` v11)
- **Smooth Scroll**: Lenis (`lenis` v1.1)
- **State Management**: Zustand (`zustand` v5) with localStorage persistence
- **Typography**: Next Google Fonts (`Cormorant Garamond Light 300`, `Italiana`, `Jost 300/400`, `Tiro Devanagari Hindi`)
- **Asset Formats**: Next/Image with AVIF and WebP optimization
- **Target Platform**: Vercel (includes `vercel.json`)

---

## 2. Project Directory Structure

```
├── app/
│   ├── layout.tsx                # Root layout, fonts, SEO JSON-LD Organization, skip-link
│   ├── page.tsx                  # Home page (10 sequential architectural sections)
│   ├── globals.css               # Design system tokens, clamp utilities, hairline rules
│   ├── fonts.ts                  # Google Font variable loaders
│   ├── sitemap.ts                # Dynamic sitemap for all 59 static routes
│   ├── robots.ts                 # Crawler directives
│   ├── icon.svg                  # SVG Favicon
│   ├── collections/
│   │   ├── page.tsx              # Collections index
│   │   └── [slug]/page.tsx       # Dynamic collection category pages (SSG)
│   ├── product/
│   │   └── [slug]/page.tsx       # 24 PDPs (sticky rail, accordions, JSON-LD)
│   ├── craft/page.tsx            # 8-step scrollytelling with real-time oxidation filter
│   ├── artisans/page.tsx         # Master craftsman profiles from Bidar
│   ├── heritage/page.tsx         # 1422 Bahmani Court history & GI Tag No. 12
│   ├── bespoke/page.tsx          # 3-step (01/03) private commission brief
│   ├── gifting/page.tsx          # Hamper suite builder, handwriting card, video booking
│   ├── authenticity/page.tsx     # Certificate & provenance registry lookup
│   ├── checkout/
│   │   ├── page.tsx              # 3-step checkout flow (Identity, Delivery, Settlement)
│   │   └── confirmation/page.tsx # Order confirmation with assigned certificate deed
│   ├── account/page.tsx          # Wishlist & registered deed vault
│   ├── journal/
│   │   ├── page.tsx              # Curatorial essays
│   │   └── [slug]/page.tsx       # Essay reading view
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── faq/page.tsx
│   ├── care-guide/page.tsx
│   ├── shipping/page.tsx
│   ├── returns/page.tsx
│   ├── privacy/page.tsx
│   └── terms/page.tsx
├── components/
│   ├── ui/
│   │   ├── Wordmark.tsx          # Inline SVG wordmark (0.42em Italiana tracking)
│   │   ├── CustomCursor.tsx      # Desktop spring cursor (8px -> 56px "VIEW")
│   │   ├── Reveal.tsx            # Restrained choreographic motion reveals
│   │   ├── Marquee.tsx           # 40s slow-scrolling hairline marquee
│   │   ├── ProductCard.tsx       # Minimal card with 600ms macro crossfade
│   │   └── Accordion.tsx         # Animated height disclosure
│   ├── layout/
│   │   ├── AnnouncementBar.tsx   # 34px bar rotating every 6s
│   │   ├── Navbar.tsx            # Transparent-to-ivory nav with mega-panel
│   │   ├── Footer.tsx            # Bidri-black footer with oversized wordmark
│   │   ├── SmoothScroll.tsx      # Lenis smooth scroll provider
│   │   └── LayoutClientContainer.tsx
│   ├── home/
│   │   ├── HeroSplit.tsx         # 58/42 split hero with 14-word line
│   │   ├── CollectionsIndex.tsx  # Editorial index with cursor-following 420x520 card
│   │   ├── EditorialBreak.tsx    # 21:9 full-bleed banner with offset quote
│   │   ├── HorizontalCraft.tsx   # 6-frame metallurgical preview
│   │   ├── FeaturedArtefacts.tsx # 2x2 grid with empty left ivory column
│   │   ├── DevanagariBand.tsx    # 70vh full-bleed bidri-black band
│   │   └── ClosersSection.tsx    # Values, Artisan spotlight, IG, Newsletter
│   ├── product/
│   │   └── ProductClientView.tsx # Sticky PDP right rail & image stack
│   ├── cart/
│   │   └── CartDrawer.tsx        # 480px ivory drawer with 30-min reservation
│   └── search/
│       └── SearchModal.tsx       # Fullscreen search overlay with live results
├── content/
│   ├── products.ts               # 24 fully-typed Bidri products
│   ├── collections.ts            # 6 collection typologies
│   ├── craft.ts                  # 8-step metallurgical scrollytelling data
│   ├── artisans.ts               # Master craftsman biographies
│   ├── authenticity.ts           # 12 verified certificate records
│   └── journal.ts                # 3 editorial essays
├── lib/
│   ├── tokens.ts                 # Design tokens and grid specifications
│   ├── cartStore.ts              # Zustand cart store with localStorage persistence
│   └── wishlistStore.ts          # Zustand wishlist store
├── public/
│   └── img/                      # Hero, editorial, product, process, artisan assets
└── vercel.json                   # Vercel deployment configuration
```

---

## 3. How to Run Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

3. **Build for Production**:
   ```bash
   npm run build
   npm run start
   ```

---

## 4. How to Add a New Product

Open `content/products.ts` and append a new object conforming to the `Product` interface:

```typescript
{
  slug: 'new-artefact-slug',
  name: 'Name of Artefact',
  collection: 'jewellery' | 'table-and-decor' | 'barware' | 'desk-and-study' | 'gifting' | 'the-archive',
  price: 24500, // in INR (0 for POA / Enquire)
  formattedPrice: '₹ 24,500',
  currency: 'INR',
  metal: 'Zinc-copper alloy',
  inlay: 'Pure silver' | 'Silver & brass',
  dimensions: '14.2 cm diameter · 2.8 cm height',
  weight: '180 grams',
  artisanId: 'artisan-1',
  artisanName: 'Master Shah Rasheed Ahmed Quadri',
  craftHours: 42,
  edition: 'Numbered' | 'One of one',
  story: 'Concise story under 45 words describing the historical motif and court significance.',
  care: 'Care instructions under 25 words specifying dry cloth and groundnut oil.',
  images: {
    hero: '/img/product/new-artefact-slug-hero.jpg', // 1:1 isolated on #FBFAF8
    macro: '/img/product/new-artefact-slug-macro.jpg', // 3:2 extreme macro
    inFrame: '/img/editorial/editorial-1.jpg',
  },
  alt: 'Descriptive alt text describing metalcraft and silhouette',
  stock: 3,
  sku: 'BC-CAT-025',
}
```
Re-run `npm run build` to statically generate the new PDP route and update sitemaps automatically.
