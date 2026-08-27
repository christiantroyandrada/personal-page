import assert from 'node:assert/strict';
import test from 'node:test';

import {
  applyTheme,
  getInitialTheme,
  safeReadTheme,
  safeWriteTheme,
} from '../js/site.mjs';

test('stored theme wins over the system preference', () => {
  assert.equal(getInitialTheme('light', true), 'light');
  assert.equal(getInitialTheme('dark', false), 'dark');
});

test('invalid or missing storage falls back to system preference', () => {
  assert.equal(getInitialTheme(null, true), 'dark');
  assert.equal(getInitialTheme('sepia', false), 'light');
});

test('storage failures do not break theme selection', () => {
  const storage = {
    getItem() { throw new Error('blocked'); },
    setItem() { throw new Error('blocked'); },
  };
  assert.equal(safeReadTheme(storage), null);
  assert.equal(safeWriteTheme(storage, 'dark'), false);
});

test('applyTheme updates theme and native colour scheme together', () => {
  const root = { dataset: {}, style: {} };
  applyTheme(root, 'dark');
  assert.equal(root.dataset.theme, 'dark');
  assert.equal(root.style.colorScheme, 'dark');
});
