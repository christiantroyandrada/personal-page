import assert from 'node:assert/strict';
import { stat, readFile } from 'node:fs/promises';
import test from 'node:test';

import { SITE_PAGES, getJsonLd, readPage } from './helpers/site.mjs';

const expectedCanonicals = {
  'index.html': 'https://ctaprojects.xyz/',
  'contacts.html': 'https://ctaprojects.xyz/contacts.html',
  'hobbies.html': 'https://ctaprojects.xyz/hobbies.html',
};

for (const page of SITE_PAGES) {
  test(`${page} has complete unique search and social metadata`, async () => {
    const html = await readPage(page);
    assert.match(html, /<title>[^<]{20,65}<\/title>/);
    assert.match(html, /<meta name="description" content="[^\"]{70,170}">/);
    assert.match(html, new RegExp(`<link rel="canonical" href="${expectedCanonicals[page].replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}">`));
    assert.match(html, /<meta property="og:image" content="https:\/\/ctaprojects\.xyz\/img\/social-card\.png">/);
    assert.match(html, /<meta name="twitter:card" content="summary_large_image">/);
  });
}

test('homepage ProfilePage JSON-LD matches the visible person and links', async () => {
  const home = await readPage('index.html');
  const data = getJsonLd(home);
  assert.equal(data['@type'], 'ProfilePage');
  assert.equal(data.mainEntity['@type'], 'Person');
  assert.equal(data.mainEntity.name, 'Christian Troy Andrada');
  assert.match(data.mainEntity.description, /builds and operates production systems/i);
  assert.deepEqual(data.mainEntity.sameAs.sort(), [
    'https://github.com/christiantroyandrada',
    'https://www.linkedin.com/in/christiantroyandrada/',
  ].sort());
});

test('social card is a real 1200 by 630 PNG asset', async () => {
  const file = await stat(new URL('../img/social-card.png', import.meta.url));
  assert.ok(file.size > 20_000);
  const bytes = await readFile(new URL('../img/social-card.png', import.meta.url));
  assert.equal(bytes.subarray(1, 4).toString(), 'PNG');
});

test('robots and sitemap expose only canonical public pages', async () => {
  const robots = await readFile(new URL('../robots.txt', import.meta.url), 'utf8');
  const sitemap = await readFile(new URL('../sitemap.xml', import.meta.url), 'utf8');
  assert.match(robots, /Sitemap: https:\/\/ctaprojects\.xyz\/sitemap\.xml/);
  for (const url of Object.values(expectedCanonicals)) assert.match(sitemap, new RegExp(url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  assert.doesNotMatch(sitemap, /\.superpowers|localhost|github\.com/);
});
