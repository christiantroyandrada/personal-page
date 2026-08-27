import assert from 'node:assert/strict';
import test from 'node:test';

import { readCss } from './helpers/site.mjs';

const css = await readCss();

test('uses local display and body fonts', () => {
  assert.match(css, /font-family:\s*['"]Barlow Semi Condensed/);
  assert.match(css, /font-family:\s*['"]Atkinson Hyperlegible Next/);
  assert.match(css, /url\(['"]?\.\.\/fonts\/BarlowSemiCondensed-latin\.woff2/);
  assert.doesNotMatch(css, /fonts\.googleapis\.com|fonts\.gstatic\.com/);
});

test('defines light and dark OKLCH material tokens', () => {
  assert.match(css, /:root\s*{[\s\S]*--color-canvas:\s*oklch\(/);
  assert.match(css, /\[data-theme=['"]dark['"]\]\s*{[\s\S]*--color-canvas:\s*oklch\(/);
});

test('does not use banned generated-design patterns', () => {
  assert.doesNotMatch(css, /background-clip:\s*text|-webkit-background-clip:\s*text/);
  assert.doesNotMatch(css, /border-(left|right):\s*[2-9]/);
});

test('reduced motion disables entrances and smooth scrolling', () => {
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
  assert.match(css, /scroll-behavior:\s*auto/);
  assert.match(css, /animation-duration:\s*0\.01ms/);
});
