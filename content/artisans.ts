export interface Artisan {
  id: string;
  name: string;
  title: string;
  lineage: string;
  experience: string;
  quote: string;
  bio: string;
  image: string;
  signatureSpecialty: string;
}

export const artisans: Artisan[] = [
  {
    id: 'artisan-1',
    name: 'Master Shah Rasheed Ahmed Quadri',
    title: 'Master Craftsman & Padma Shri Awardee',
    lineage: 'Seventh Generation Master Family of Bidar',
    experience: '48 years at the workbench',
    quote: 'The soil of the fort knows the metal. When the blackness takes hold, the silver does not shine—it breathes.',
    bio: 'Born in the Old City of Bidar, Master Quadri trained under his father from age twelve. His masterworks reside in national museums and presidential collections worldwide.',
    image: '/img/artisan/artisan-1.jpg',
    signatureSpecialty: 'Imperial Surahi Ewers & Tarkashi Fine Wire Inlay',
  },
  {
    id: 'artisan-2',
    name: 'Abdul Rauf',
    title: 'Senior Inlay Artist',
    lineage: 'Family of Royal Court Metalworkers',
    experience: '34 years of practice',
    quote: 'You do not press silver into metal with force. You invite it to become part of the dark.',
    bio: 'Master Rauf specialises in intricate Meenakari sheet inlay and geometric jaali screens. He oversees the preparation of fort earth solutions in our Bidar atelier.',
    image: '/img/artisan/artisan-2.jpg',
    signatureSpecialty: 'Architectural Jaali Latticework & Caskets',
  },
  {
    id: 'artisan-3',
    name: 'Mohammed Saleem',
    title: 'Master Founder & Patination Specialist',
    lineage: 'Deccan Metallurgy Guild',
    experience: '29 years of practice',
    quote: 'A single second too long in the boiling bath and the depth is lost. The eye alone decides.',
    bio: 'Saleem leads the crucible alloy casting and traditional blackening processes, preserving temperature control methods handed down through five hundred years.',
    image: '/img/artisan/artisan-3.jpg',
    signatureSpecialty: 'Solid Casting & Fort Soil Oxidation',
  },
  {
    id: 'artisan-4',
    name: 'Zareena Begum',
    title: 'Master Goldsmith & Wire Draughtswoman',
    lineage: 'Women Artisans Collective of Bidar',
    experience: '22 years of practice',
    quote: 'Silver wire so thin it resembles morning mist. Every loop is drawn by hand.',
    bio: 'Zareena has pioneered women’s leadership in fine silver wire drawing and miniature filigree inlay, mentoring the next generation of young artisans in Bidar.',
    image: '/img/artisan/artisan-4.jpg',
    signatureSpecialty: 'Jewellery Adornments & Miniature Inlay',
  },
];
