export interface Collection {
  slug: string;
  numeral: string;
  name: string;
  descriptor: string;
  itemsRef: string;
  headline: string;
  description: string;
  image: string;
  count: number;
}

export const collections: Collection[] = [
  {
    slug: 'table-and-decor',
    numeral: '01',
    name: 'Home Décor & Vases',
    descriptor: 'Living Spaces',
    itemsRef: 'Surahi Ewers, Bulbous Vases & Lotus Bowls',
    headline: 'Objects of Sculptural Presence',
    description: 'Surahi ewers, bulbous vases, peacock trays, and lotus bowls — handcrafted Bidriware that transforms living spaces into heritage galleries.',
    image: '/img/product/bulbous-vase-12-craft.jpg',
    count: 5,
  },
  {
    slug: 'sculptures-and-statues',
    numeral: '02',
    name: 'Sculptures & Statues',
    descriptor: 'Cast Metal Statues',
    itemsRef: 'Royal Elephant Statues & Animal Figurines',
    headline: 'Artisanal Statues & Royal Motifs',
    description: 'Hand-cast zinc-copper animal figurines, royal elephants, and ceremonial centerpieces chiselled with intricate silver arabesques.',
    image: '/img/collections/elephant_sculpture_collection.jpg',
    count: 3,
  },
  {
    slug: 'barware',
    numeral: '03',
    name: 'Barware & Hospitality',
    descriptor: 'Evening Entertaining',
    itemsRef: 'Wine Goblets, Hip Flasks & Bar Coasters',
    headline: 'Chalices, Flasks & Coasters',
    description: 'Heirloom vessels for hospitality, marrying stainless steel liners with six-century-old Bidri silver inlay art.',
    image: '/img/collections/wine_goblets_collection.jpg',
    count: 4,
  },
  {
    slug: 'desk-and-study',
    numeral: '04',
    name: 'Desk & Office Décor',
    descriptor: 'Workplace Objects',
    itemsRef: 'Pen Stands, Card Cases & Paperweights',
    headline: 'Instruments of Focus & Thought',
    description: 'Weighted pen rests, card cases, paperweights, and carved letter openers crafted for mindful correspondence and executive desks.',
    image: '/img/collections/desk_accessories_collection.jpg',
    count: 3,
  },
  {
    slug: 'gifting',
    numeral: '05',
    name: 'Traditional Gifts & Boxes',
    descriptor: 'Heirloom Celebrations',
    itemsRef: 'Royal Paan-Daan Boxes & Keepsake Caskets',
    headline: 'Treasures of Lasting Remembrance',
    description: 'Ceremonial paan-daan boxes and handcrafted caskets for weddings, corporate gifting, and landmark Indian celebrations.',
    image: '/img/editorial/editorial-6.jpg',
    count: 2,
  },
  {
    slug: 'the-archive',
    numeral: '06',
    name: 'Museum Masterpieces',
    descriptor: 'Imperial Masterworks',
    itemsRef: '17th-Century Bahmani Court Huqqa Bases',
    headline: 'Museum Recreations',
    description: 'Single-edition museum recreations hand-cast and inlaid over hundreds of hours by national award-winning master craftsmen.',
    image: '/img/product/bahmani-court-huqqa-base-craft.jpg',
    count: 1,
  },
];
