import { mkdir, writeFile } from 'node:fs/promises';

import { extractLatinWoff2 } from './font-source.mjs';

const cssUrl = new URL('https://fonts.googleapis.com/css2');
cssUrl.searchParams.append('family', 'Barlow Semi Condensed:wght@700');
cssUrl.searchParams.append('family', 'Atkinson Hyperlegible Next:ital,wght@0,400;1,400');
cssUrl.searchParams.set('display', 'swap');

const response = await fetch(cssUrl, {
  headers: {
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  },
});
if (!response.ok) throw new Error(`Google Fonts CSS failed: ${response.status}`);
const css = await response.text();

const targets = [
  { family: 'Barlow Semi Condensed', style: 'normal', weight: '700', file: 'BarlowSemiCondensed-latin.woff2' },
  { family: 'Atkinson Hyperlegible Next', style: 'normal', weight: '400', file: 'AtkinsonHyperlegibleNext-latin.woff2' },
  { family: 'Atkinson Hyperlegible Next', style: 'italic', weight: '400', file: 'AtkinsonHyperlegibleNext-italic-latin.woff2' },
];

await mkdir(new URL('../fonts/', import.meta.url), { recursive: true });
for (const target of targets) {
  const url = extractLatinWoff2(css, target);
  const font = await fetch(url);
  if (!font.ok) throw new Error(`Font download failed: ${font.status}`);
  await writeFile(new URL(`../fonts/${target.file}`, import.meta.url), Buffer.from(await font.arrayBuffer()));
}

const licenses = [
  ['https://raw.githubusercontent.com/jpt/barlow/main/OFL.txt', 'OFL-Barlow.txt'],
  ['https://raw.githubusercontent.com/googlefonts/atkinson-hyperlegible-next/main/OFL.txt', 'OFL-Atkinson-Hyperlegible-Next.txt'],
];
for (const [url, file] of licenses) {
  const license = await fetch(url);
  if (!license.ok) throw new Error(`License download failed: ${license.status}`);
  await writeFile(new URL(`../fonts/${file}`, import.meta.url), await license.text());
}
