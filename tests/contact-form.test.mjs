import assert from 'node:assert/strict';
import test from 'node:test';

import { enhanceContactForm } from '../js/site.mjs';

function createForm() {
  let submit;
  const label = { textContent: 'Send message' };
  const status = { textContent: '' };
  const button = { disabled: false };
  const form = {
    action: 'https://formspree.io/f/test',
    resetCalls: 0,
    addEventListener(type, handler) { if (type === 'submit') submit = handler; },
    querySelector(selector) {
      return {
        '[data-submit-button]': button,
        '[data-submit-label]': label,
        '[data-form-status]': status,
      }[selector];
    },
    reset() { this.resetCalls += 1; },
  };
  return { form, button, label, status, submit: () => submit({ preventDefault() {} }) };
}

test('contact enhancement reports success only after an OK response', async () => {
  const originalFormData = globalThis.FormData;
  globalThis.FormData = class { constructor(form) { this.form = form; } };
  try {
    const fixture = createForm();
    enhanceContactForm(fixture.form, async () => ({ ok: true }));
    await fixture.submit();
    assert.equal(fixture.form.resetCalls, 1);
    assert.equal(fixture.status.textContent, 'Message sent. I will get back to you soon.');
    assert.equal(fixture.button.disabled, false);
    assert.equal(fixture.label.textContent, 'Send message');
  } finally {
    globalThis.FormData = originalFormData;
  }
});

test('contact enhancement keeps input and offers email after failure', async () => {
  const originalFormData = globalThis.FormData;
  globalThis.FormData = class {};
  try {
    const fixture = createForm();
    enhanceContactForm(fixture.form, async () => ({ ok: false }));
    await fixture.submit();
    assert.equal(fixture.form.resetCalls, 0);
    assert.match(fixture.status.textContent, /Email me directly/);
  } finally {
    globalThis.FormData = originalFormData;
  }
});
