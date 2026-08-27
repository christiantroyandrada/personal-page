import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');

test('confidential project uses a generic local preview and bounded copy', () => {
  assert.doesNotMatch(html, /Screenshot_2025-05-23_at_1\.38\.30_PM/);
  assert.doesNotMatch(html, /Money tracker|D3\.js|Svelte \+ SSR as required by client/);
  assert.match(html, /confidential|NDA/i);
  assert.match(html, /without sharing protected details/i);
});
