import assert from 'node:assert/strict';
import test from 'node:test';

import {
  applyTheme,
  getInitialTheme,
  safeReadTheme,
  safeWriteTheme,
  initializeReveals,
  initializeTheme,
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

test('theme toggle updates the document, label, pressed state, and storage', () => {
  let click;
  const root = { dataset: { theme: 'light' }, style: {} };
  const label = { textContent: '' };
  const toggle = {
    attributes: {},
    setAttribute(name, value) { this.attributes[name] = value; },
    addEventListener(type, handler) { if (type === 'click') click = handler; },
    querySelector() { return label; },
  };
  const writes = [];
  const storage = { getItem: () => null, setItem: (...args) => writes.push(args) };
  const media = { matches: false, addEventListener() {} };

  initializeTheme({ root, toggle, storage, media });
  click();

  assert.equal(root.dataset.theme, 'dark');
  assert.equal(toggle.attributes['aria-pressed'], 'true');
  assert.equal(label.textContent, 'Light');
  assert.deepEqual(writes, [['theme', 'dark']]);
});

test('reveal initializer exposes everything when motion is reduced', () => {
  const elements = [
    { classList: { add(value) { this.value = value; } } },
    { classList: { add(value) { this.value = value; } } },
  ];
  initializeReveals({ elements, reducedMotion: true });
  assert.deepEqual(elements.map((element) => element.classList.value), ['is-visible', 'is-visible']);
});
