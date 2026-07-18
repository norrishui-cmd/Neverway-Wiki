import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const publisherId = 'ca-pub-9505220977121599';
const accountMeta = `<meta name="google-adsense-account" content="${publisherId}">`;
const adsenseScript = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}" crossorigin="anonymous"></script>`;
const htmlFiles = [];

async function walk(directory) {
  for (const name of await readdir(directory)) {
    if (name === 'scripts') continue;
    const file = resolve(directory, name);
    const info = await stat(file);
    if (info.isDirectory()) await walk(file);
    else if (name.endsWith('.html')) htmlFiles.push(file);
  }
}

await walk(root);

let changed = 0;
for (const file of htmlFiles) {
  let html = await readFile(file, 'utf8');
  const before = html;
  if (!html.includes('name="google-adsense-account"')) {
    html = html.replace(/<head(.*?)>/i, `<head$1>\n    ${accountMeta}`);
  }
  if (!html.includes('pagead2.googlesyndication.com/pagead/js/adsbygoogle.js')) {
    html = html.replace(/<head(.*?)>/i, `<head$1>\n    ${adsenseScript}`);
  }
  if (html !== before) {
    await writeFile(file, html);
    changed += 1;
  }
}

await writeFile(
  resolve(root, 'ads.txt'),
  'google.com, pub-9505220977121599, DIRECT, f08c47fec0942fa0\n',
);

console.log(`AdSense configured on ${htmlFiles.length} HTML files; ${changed} files changed.`);
