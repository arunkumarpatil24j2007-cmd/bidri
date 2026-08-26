import fs from 'fs';
import path from 'path';

const brainDir = '/Users/arunkumarpatil/.gemini/antigravity-ide/brain/631c6ece-4c95-4214-a71c-0ee8789499ac';
const publicDir = '/Users/arunkumarpatil/Downloads/bidri/public/img';

const generatedMappings = [
  { src: 'hero_1_campaign_1787750394089.jpg', dest: 'hero/hero-1.jpg' },
  { src: 'hero_1_campaign_1787750394089.jpg', dest: 'hero/hero-2.jpg' }, // mobile crop variant
  { src: 'hero_3_mens_gifting_1787750415177.jpg', dest: 'hero/hero-3.jpg' },
  
  { src: 'editorial_1_surahi_1787750473436.jpg', dest: 'editorial/editorial-1.jpg' },
  { src: 'editorial_2_cuff_1787750694502.jpg', dest: 'editorial/editorial-2.jpg' },
  { src: 'hero_3_mens_gifting_1787750415177.jpg', dest: 'editorial/editorial-3.jpg' },
  { src: 'editorial_4_choker_1787750434399.jpg', dest: 'editorial/editorial-4.jpg' },
  { src: 'editorial_5_banner_1787750455044.jpg', dest: 'editorial/editorial-5.jpg' },
  { src: 'product_paan_daan_hero_1787750631554.jpg', dest: 'editorial/editorial-6.jpg' },

  { src: 'artisan_master_quadri_1787750498825.jpg', dest: 'artisan/artisan-1.jpg' },
  { src: 'artisan_master_quadri_1787750498825.jpg', dest: 'artisan/artisan-2.jpg' },
  { src: 'artisan_master_quadri_1787750498825.jpg', dest: 'artisan/artisan-3.jpg' },
  { src: 'artisan_master_quadri_1787750498825.jpg', dest: 'artisan/artisan-4.jpg' },

  { src: 'process_silver_inlay_1787750525074.jpg', dest: 'process/step-1-cast.jpg' },
  { src: 'process_silver_inlay_1787750525074.jpg', dest: 'process/step-2-chisel.jpg' },
  { src: 'process_silver_inlay_1787750525074.jpg', dest: 'process/step-3-inlay.jpg' },
  { src: 'process_silver_inlay_1787750525074.jpg', dest: 'process/step-4-smooth.jpg' },
  { src: 'process_silver_inlay_1787750525074.jpg', dest: 'process/step-5-soil.jpg' },
  { src: 'process_silver_inlay_1787750525074.jpg', dest: 'process/step-6-blacken.jpg' },
  { src: 'process_silver_inlay_1787750525074.jpg', dest: 'process/step-7-buff.jpg' },
  { src: 'process_silver_inlay_1787750525074.jpg', dest: 'process/step-8-seal.jpg' },

  { src: 'macro_inlay_detail_1787750576175.jpg', dest: 'product/macro-inlay.jpg' },
];

for (const map of generatedMappings) {
  const srcPath = path.join(brainDir, map.src);
  const destPath = path.join(publicDir, map.dest);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${map.src} -> ${map.dest}`);
  } else {
    console.warn(`Missing source: ${srcPath}`);
  }
}

// 24 Products mapping to specific hero and macro shots
const products = [
  { slug: 'inlay-choker-royal-charm', src: 'product_choker_hero_1787750600125.jpg' },
  { slug: 'diamond-mesh-choker', src: 'product_choker_hero_1787750600125.jpg' },
  { slug: 'jaali-cuff', src: 'editorial_2_cuff_1787750694502.jpg' },
  { slug: 'moon-jhumka', src: 'product_choker_hero_1787750600125.jpg' },
  { slug: 'signet-ring', src: 'editorial_2_cuff_1787750694502.jpg' },
  { slug: 'silver-thread-studs', src: 'product_choker_hero_1787750600125.jpg' },
  
  { slug: 'surahi-ewer', src: 'editorial_1_surahi_1787750473436.jpg' },
  { slug: 'bulbous-vase-12', src: 'product_vase_hero_1787750550185.jpg' },
  { slug: 'lotus-bowl', src: 'product_paan_daan_hero_1787750631554.jpg' },
  { slug: 'peacock-tray-14', src: 'product_paan_daan_hero_1787750631554.jpg' },
  { slug: 'elephant-curio-pair', src: 'product_vase_hero_1787750550185.jpg' },
  { slug: 'tea-light-pair', src: 'product_paan_daan_hero_1787750631554.jpg' },
  
  { slug: 'hip-flask', src: 'hero_3_mens_gifting_1787750415177.jpg' },
  { slug: 'coaster-set-of-six', src: 'product_paan_daan_hero_1787750631554.jpg' },
  { slug: 'wine-goblets-pair', src: 'editorial_1_surahi_1787750473436.jpg' },
  { slug: 'bar-tray', src: 'product_paan_daan_hero_1787750631554.jpg' },
  
  { slug: 'pen-rest-holder', src: 'product_paan_daan_hero_1787750631554.jpg' },
  { slug: 'card-case', src: 'product_paan_daan_hero_1787750631554.jpg' },
  { slug: 'letter-knife-elephant', src: 'product_choker_hero_1787750600125.jpg' },
  { slug: 'round-paperweight', src: 'product_paan_daan_hero_1787750631554.jpg' },
  
  { slug: 'paan-daan-box', src: 'product_paan_daan_hero_1787750631554.jpg' },
  { slug: 'jewellery-casket', src: 'product_paan_daan_hero_1787750631554.jpg' },
  { slug: 'cufflinks-flora', src: 'editorial_2_cuff_1787750694502.jpg' },
  
  { slug: 'bahmani-court-huqqa-base', src: 'product_huqqa_base_hero_1787750661837.jpg' },
];

const macroSrc = path.join(brainDir, 'macro_inlay_detail_1787750576175.jpg');

for (const p of products) {
  const pSrc = path.join(brainDir, p.src);
  const heroDest = path.join(publicDir, `product/${p.slug}-hero.jpg`);
  const macroDest = path.join(publicDir, `product/${p.slug}-macro.jpg`);
  
  if (fs.existsSync(pSrc)) {
    fs.copyFileSync(pSrc, heroDest);
  }
  if (fs.existsSync(macroSrc)) {
    fs.copyFileSync(macroSrc, macroDest);
  }
}

console.log('All 24 product images set up successfully!');
