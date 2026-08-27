import assert from 'node:assert/strict';
import { access } from 'node:fs/promises';
import test from 'node:test';

import { SITE_PAGES, readPage } from './helpers/site.mjs';

test('every relative page and asset reference exists', async () => {
  for (const page of SITE_PAGES) {
    const html = await readPage(page);
    const refs = [...html.matchAll(/(?:href|src)=["'](\.\/[^"'#?]+)["']/g)].map((match) => match[1]);
    for (const ref of refs) {
      const target = new URL(`../${ref.replace(/^\.\//, '')}`, import.meta.url);
      await assert.doesNotReject(access(target), `${page} references missing ${ref}`);
    }
  }
});

test('all pages load the shared module and contain no inline interaction handlers', async () => {
  for (const page of SITE_PAGES) {
    const html = await readPage(page);
    assert.match(html, /<script type="module" src="\.\/js\/site\.mjs"><\/script>/);
    assert.doesNotMatch(html, /\son(click|keydown|submit)=/i);
  }
});
