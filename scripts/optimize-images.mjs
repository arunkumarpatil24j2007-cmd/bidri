import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const IMG_DIR = path.resolve('public/img');

async function getFiles(dir) {
  const dirents = await fs.promises.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = path.resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
    })
  );
  return files.flat();
}

async function optimizeImages() {
  const allFiles = await getFiles(IMG_DIR);
  const imageFiles = allFiles.filter((f) => /\.(jpe?g|png)$/i.test(f));

  console.log(`Found ${imageFiles.length} images to optimize...`);
  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of imageFiles) {
    const statBefore = await fs.promises.stat(file);
    totalBefore += statBefore.size;

    const isHeroOrBanner = /hero|night_bidri|flatlay|banner/i.test(file);
    const maxDimension = isHeroOrBanner ? 1920 : 1200;

    try {
      const buffer = await fs.promises.readFile(file);
      const metadata = await sharp(buffer).metadata();

      let pipeline = sharp(buffer);
      if (metadata.width && metadata.width > maxDimension) {
        pipeline = pipeline.resize({ width: maxDimension, withoutEnlargement: true });
      }

      if (/\.png$/i.test(file)) {
        pipeline = pipeline.png({ compressionLevel: 9, quality: 85 });
      } else {
        pipeline = pipeline.jpeg({ quality: 82, progressive: true, mozjpeg: true });
      }

      const outputBuffer = await pipeline.toBuffer();
      await fs.promises.writeFile(file, outputBuffer);

      const statAfter = await fs.promises.stat(file);
      totalAfter += statAfter.size;
      const savings = (((statBefore.size - statAfter.size) / statBefore.size) * 100).toFixed(1);
      console.log(`✓ ${path.relative(process.cwd(), file)}: ${(statBefore.size / 1024).toFixed(0)}KB → ${(statAfter.size / 1024).toFixed(0)}KB (-${savings}%)`);
    } catch (err) {
      console.error(`Error optimizing ${file}:`, err);
    }
  }

  console.log(`\n🎉 Total Optimization: ${(totalBefore / 1024 / 1024).toFixed(2)}MB → ${(totalAfter / 1024 / 1024).toFixed(2)}MB (-${(((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1)}%)`);
}

optimizeImages();
