# DECISIONS.md — Art Direction & Technical Rationale

This document records the architectural, curatorial, and design decisions made while engineering the **BIDRI CRAFTS** luxury commerce maison.

---

## 1. Governing Aesthetic: "A Museum in the Morning Light"

- **Negative Space Rule**: At least 60% of every screen is empty ivory (`#FBFAF8`). To maintain museum rigor, all containers are restricted to a max width of 1440px with generous 120px desktop gutters and 160px vertical padding.
- **Palette Discipline**: No pure `#FFFFFF` is used. Pure white creates sterile commercial glare; `#FBFAF8` ivory mimics archival rag paper and limestone museum plinths. Borders are uniformly set to 1px silver (`#C9C6C1`) at 40% opacity.
- **Antique Gold (`#8A6B3B`) Restriction**: Strictly used at most once per page — primarily as the focused outline ring or the archival authentication seal stamp — to prevent decorative ostentation.
- **No Gradients, Drop Shadows, or Rounded Corners**: All border radii are capped at 0px / 2px. True luxury metalcraft is defined by sharp planar chisels and clean geometric edges.

---

## 2. Typography & Editorial Tone

- **Display**: Cormorant Garamond Light (300) set at tight negative tracking (`-0.02em`) and clamped gracefully (`clamp(2.6rem, 7vw, 7.5rem)`) with line-height of 1.05.
- **Eyebrows & Wordmark**: Italiana uppercase with wide tracking (`0.42em`), capped strictly at 10–11px to establish quiet authority.
- **Devanagari Usage**: Reserved exclusively for the central 70vh full-bleed band (*"काली धातु, उजली चाँदी।"*) to maintain poetic scarcity.
- **Copy Restrictions**: Enforced British spelling (`artefact`, `catalogue`, `lustre`), zero exclamation marks, zero prohibited marketing clichés (*"luxury"*, *"buy now"*, *"elevate"*), and hard limits of ≤45 words per section or story.

---

## 3. Motion & Choreography

- **Restrained Motion Curve**: Custom cubic bezier `[0.22, 1, 0.36, 1]` with a 0.9s duration and 80ms stagger.
- **Micro-interactions**:
  - Wordmark rendered as an inline vector with hairline rule.
  - Custom 8px dot cursor that enlarges to 56px with "VIEW" on interactive imagery.
  - Collections index with a 420×520 floating preview card following the cursor with spring physics.
  - PDP product cards with a 600ms crossfade between the 1:1 silhouette and the 3:2 extreme macro inlay shot.
- **Prefers-Reduced-Motion**: Fully respected with immediate bypass of all transform and scale effects.

---

## 4. Scrollytelling Metallurgy & Live Oxidation

- On `/craft`, the transition from raw grey zinc-copper alloy to jet-black metal is driven by scroll progress interacting with CSS filter matrix calculations (`brightness`, `grayscale`, `contrast`), reflecting the real-world chemistry of boiling fort earth and ammonium chloride.

---

## 5. State Management & Offline Resilience

- Zustand store with `zustand/middleware` `persist` maintains the cart and wishlist in `localStorage`.
- All 24 products, 6 collection routes, 3 journal essays, and ancillary legal pages are statically prerendered with Next.js 15 App Router (`generateStaticParams`) for instant sub-second page loads and zero layout shift.
