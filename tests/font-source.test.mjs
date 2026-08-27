import assert from 'node:assert/strict';
import test from 'node:test';

import { extractLatinWoff2 } from '../scripts/font-source.mjs';

const css = `
/* latin */
@font-face {
  font-family: 'Barlow Semi Condensed';
  font-style: normal;
  font-weight: 700;
  src: url(https://fonts.example/barlow-latin.woff2) format('woff2');
}
`;

test('extracts the requested Latin WOFF2 face from Google Fonts CSS', () => {
  assert.equal(
    extractLatinWoff2(css, { family: 'Barlow Semi Condensed', style: 'normal', weight: '700' }),
    'https://fonts.example/barlow-latin.woff2',
  );
});

test('rejects a response that does not contain the requested WOFF2 face', () => {
  assert.throws(
    () => extractLatinWoff2(css, { family: 'Atkinson Hyperlegible Next', style: 'normal', weight: '400' }),
    /Latin WOFF2 not found/,
  );
});
