export interface CraftStep {
  step: number;
  numeral: string;
  title: string;
  caption: string;
  detail: string;
  image: string;
  isBlackening?: boolean;
}

export const craftSteps: CraftStep[] = [
  {
    step: 1,
    numeral: '01',
    title: 'Cast the Alloy',
    caption: 'Molten zinc and copper poured into prepared clay moulds.',
    detail: 'A ratio of sixteen parts zinc to one part copper is melted in crucibles. This specific balance creates an alloy that accepts fine chiselling without shattering.',
    image: '/img/process/step-1-cast.jpg',
  },
  {
    step: 2,
    numeral: '02',
    title: 'Chisel the Groove',
    caption: 'Master inlayers carve floral pathways with steel qalam chisels.',
    detail: 'Working freehand without stencils, the artisan cuts microscopic angled channels across the curved metal face with steady hammer taps.',
    image: '/img/process/step-2-chisel.jpg',
  },
  {
    step: 3,
    numeral: '03',
    title: 'Embed Pure Silver',
    caption: 'Fine silver wire hammered flush into engraved recesses.',
    detail: 'Purity 99.9% silver wire or thin leaf is laid into each furrow and tapped firmly until locked mechanically inside the alloy matrix.',
    image: '/img/process/step-3-inlay.jpg',
  },
  {
    step: 4,
    numeral: '04',
    title: 'File & Smooth',
    caption: 'Surfaces sanded until silver and base metal form one unbroken plane.',
    detail: 'Successive emery papers and files remove excess silver, leaving the vessel grey and uniform to the fingertip touch.',
    image: '/img/process/step-4-smooth.jpg',
  },
  {
    step: 5,
    numeral: '05',
    title: 'Fort Earth Paste',
    caption: 'Alkaline soil harvested from beneath Bidar Fort foundations.',
    detail: 'The soil of Bidar Fort contains ancient potassium nitrate and minerals unexposed to sunlight for centuries, unique to this Deccan plateau.',
    image: '/img/process/step-5-soil.jpg',
  },
  {
    step: 6,
    numeral: '06',
    title: 'The Blackening Bath',
    caption: 'Boiling earth slurry instantly oxidises metal into deep velvety black.',
    detail: 'When heated in the fort soil and ammonium chloride solution, zinc oxidises to jet-black metal while pure silver remains luminous.',
    image: '/img/process/step-6-blacken.jpg',
    isBlackening: true,
  },
  {
    step: 7,
    numeral: '07',
    title: 'Oil Burnish',
    caption: 'Groundnut oil massaged over warm metal to reveal silver brilliance.',
    detail: 'Artisans buff the cooled surface with cold-pressed oil, imparting a deep satiny sheen that repels moisture and preserves the patina.',
    image: '/img/process/step-7-buff.jpg',
  },
  {
    step: 8,
    numeral: '08',
    title: 'Hallmark & Registry',
    caption: 'Each numbered artefact inscribed with GI hallmark and lineage seal.',
    detail: 'Passed through master inspection, assigned a permanent registry number, and certified for generations of reverence.',
    image: '/img/process/step-8-seal.jpg',
  },
];
