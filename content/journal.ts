export interface JournalArticle {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  excerpt: string;
  heroImage: string;
  author: string;
  content: {
    heading?: string;
    paragraph: string;
  }[];
}

export const journalArticles: JournalArticle[] = [
  {
    slug: 'the-soil-of-bidar-fort',
    title: 'The Soil of Bidar Fort: Metallurgy of a Dark Patina',
    subtitle: 'Why the blackness of Bidriware exists nowhere else on Earth.',
    date: '18 January 2026',
    readTime: '4 min read',
    excerpt: 'Deep beneath the ramparts of Bidar Fort lies an alkaline red earth untouched by sunlight for six centuries. It contains the chemical secret of the craft.',
    heroImage: '/img/editorial/editorial-1.jpg',
    author: 'Curatorial Atelier',
    content: [
      {
        heading: 'The Ancient Earth',
        paragraph: 'In the medieval city of Bidar, master craftsmen do not use synthetic pigments or electroplating. The indelible jet-black hue of authentic Bidriware is born from a natural chemical transformation.',
      },
      {
        heading: 'The Alchemy of the Bath',
        paragraph: 'Alkaline earth collected from the foundations of Bidar Fort is mixed with ammonium chloride and boiling water. When the raw grey alloy is dipped into this cauldron, the copper-zinc metal oxidises instantly to velvet black.',
      },
      {
        heading: 'Unblemished Silver',
        paragraph: 'Pure silver wire, hammered flush into the grooves days before, possesses a different electrode potential. It ignores the bath completely, emerging luminous and clean against the pitch-black body.',
      },
    ],
  },
  {
    slug: 'six-centuries-of-silver-wire',
    title: 'Six Centuries of Silver Wire: The Bahmani Inlay Tradition',
    subtitle: 'Tracing the journey of royal Persian metalworkers to the Deccan plateau in 1422.',
    date: '04 February 2026',
    readTime: '5 min read',
    excerpt: 'Under the patronage of Sultan Ahmad Shah Bahmani, master inlayers merged Persian arabesques with local Deccan metalcraft.',
    heroImage: '/img/hero/hero-1.jpg',
    author: 'Heritage Archive',
    content: [
      {
        heading: 'The Sultan’s Court',
        paragraph: 'When the Bahmani dynasty relocated its capital to Bidar in 1422, Sultan Ahmad Shah invited goldsmiths and masters from Shiraz and Tabriz to train local craftsmen.',
      },
      {
        heading: 'Tarkashi and Meenakari',
        paragraph: 'Over generations, two primary schools emerged: Tarkashi, the fine inlay of pure silver wire, and Taihnishan, where inlaid silver sheets are engraved with intricate relief florals.',
      },
      {
        heading: 'The Living Lineage',
        paragraph: 'Today, the craft is preserved by a small circle of master families in Bidar’s Old City who continue to chisel every line freehand without stencils or mechanical guides.',
      },
    ],
  },
  {
    slug: 'living-with-bidriware',
    title: 'Living with Bidriware: The Ritual of Care and Patina',
    subtitle: 'How authentic zinc-alloy metalware evolves over generations.',
    date: '20 February 2026',
    readTime: '3 min read',
    excerpt: 'Unlike lacquered goods, authentic Bidriware is alive. Contact with human hands and vegetable oil deepens its luster.',
    heroImage: '/img/editorial/editorial-2.jpg',
    author: 'Conservation Department',
    content: [
      {
        heading: 'Tactile Longevity',
        paragraph: 'Bidri metalware thrives on gentle handling. The natural warmth of skin and periodic dry cotton wiping preserve the moisture balance of the patinated surface.',
      },
      {
        heading: 'The Groundnut Oil Ritual',
        paragraph: 'Once a year, rubbing a single drop of cold-pressed groundnut or mustard oil over the piece seals the micro-porosity of the alloy and restores the mirror-like glint of silver.',
      },
      {
        heading: 'An Heirloom That Outlives Its Keeper',
        paragraph: 'With modest care, authentic Bidriware never peels, rusts, or fades. The silver remains locked inside the metal for centuries.',
      },
    ],
  },
];
