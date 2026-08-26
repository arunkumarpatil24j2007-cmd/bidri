export interface Collection {
  slug: string;
  numeral: string;
  name: string;
  descriptor: string;
  headline: string;
  description: string;
  image: string;
  count: number;
}

export const collections: Collection[] = [
  {
    slug: 'jewellery',
    numeral: '01',
    name: 'Jewellery',
    descriptor: 'Worn Heritage',
    headline: 'Adornments of Dark Metal & Silver',
    description: 'Chokers, cuffs, and rings forged from zinc-copper alloy and pure silver wire, resting cool against the skin.',
    image: '/img/editorial/editorial-4.jpg',
    count: 6,
  },
  {
    slug: 'table-and-decor',
    numeral: '02',
    name: 'Table & Décor',
    descriptor: 'For the Home',
    headline: 'Objects of Sculptural Presence',
    description: 'Surahi ewers, bulbous vases, and lotus bowls that transform domestic surfaces into quiet architectural planes.',
    image: '/img/editorial/editorial-1.jpg',
    count: 6,
  },
  {
    slug: 'barware',
    numeral: '03',
    name: 'Barware',
    descriptor: 'Evening Rituals',
    headline: 'Chalices, Flasks & Coasters',
    description: 'Heirloom vessels designed for evening hospitality, marrying stainless steel liners with six-century inlay art.',
    image: '/img/hero/hero-3.jpg',
    count: 4,
  },
  {
    slug: 'desk-and-study',
    numeral: '04',
    name: 'Desk & Study',
    descriptor: 'Quiet Objects',
    headline: 'Instruments of Focus & Thought',
    description: 'Weighted pen rests, card cases, and paperweights created for slow correspondence and mindful work.',
    image: '/img/editorial/editorial-2.jpg',
    count: 4,
  },
  {
    slug: 'gifting',
    numeral: '05',
    name: 'Gifting',
    descriptor: 'Occasions',
    headline: 'Treasures of Lasting Remembrance',
    description: 'Ceremonial paan-daan boxes, jewellery caskets, and bespoke curation for landmark moments.',
    image: '/img/editorial/editorial-6.jpg',
    count: 3,
  },
  {
    slug: 'the-archive',
    numeral: '06',
    name: 'The Archive',
    descriptor: 'One of One',
    headline: 'Imperial Masterworks',
    description: 'Single-edition museum recreations hand-cast and inlaid over hundreds of hours by master families.',
    image: '/img/product/bahmani-court-huqqa-base-hero.jpg',
    count: 1,
  },
];
