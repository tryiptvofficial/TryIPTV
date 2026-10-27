import { readdir, writeFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import sharp from 'sharp';

/**
 * Build blur placeholders for images referenced by a string path (e.g. "/images/tivimate/epg-tv-guide.webp").
 *
 * next/image adds blurDataURL automatically only for static imports; for string srcs it must be supplied.
 * This writes an 8px WebP per file under public/images to src/lib/image-blur.generated.json, read by
 * getBlurDataURL() in src/lib/image-blur.ts. Runs before every build (prebuild) and on demand:
 *
 *   npm run images:blur
 */
const root = process.cwd();
const imagesDir = join(root, 'public', 'images');
const outFile = join(root, 'src', 'lib', 'image-blur.generated.json');
const EXTENSIONS = /\.(jpe?g|png|webp|avif)$/i;
// Same size Next.js uses for static-import placeholders; the browser blurs it with an SVG filter.
const BLUR_SIZE = 8;

async function listImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return listImages(path);
    return EXTENSIONS.test(entry.name) ? [path] : [];
  }));
  return files.flat();
}

const files = (await listImages(imagesDir)).sort();
const placeholders = {};
for (const file of files) {
  const buffer = await sharp(file)
    .resize(BLUR_SIZE, BLUR_SIZE, { fit: 'inside' })
    .webp({ quality: 70 })
    .toBuffer();
  const src = `/${relative(join(root, 'public'), file).split(sep).join('/')}`;
  placeholders[src] = `data:image/webp;base64,${buffer.toString('base64')}`;
}

await writeFile(outFile, `${JSON.stringify(placeholders, null, 2)}\n`);
const bytes = Object.values(placeholders).reduce((sum, value) => sum + value.length, 0);
console.log(`Blur placeholders: ${files.length} images, ${bytes} bytes -> ${relative(root, outFile)}`);
