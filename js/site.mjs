export const THEME_STORAGE_KEY = 'theme';

export function getInitialTheme(storedTheme, prefersDark) {
  if (storedTheme === 'light' || storedTheme === 'dark') return storedTheme;
  return prefersDark ? 'dark' : 'light';
}

export function safeReadTheme(storage) {
  try {
    const value = storage?.getItem(THEME_STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
}

export function safeWriteTheme(storage, theme) {
  try {
    storage?.setItem(THEME_STORAGE_KEY, theme);
    return true;
  } catch {
    return false;
  }
}

export function applyTheme(root, theme) {
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
}

export function initializeTheme({ root, toggle, storage, media }) {
  let storedTheme = safeReadTheme(storage);
  let theme = getInitialTheme(storedTheme, media.matches);
  const label = toggle?.querySelector('[data-theme-label]');

  const update = (nextTheme) => {
    theme = nextTheme;
    applyTheme(root, theme);
    if (!toggle) return;
    const isDark = theme === 'dark';
    toggle.setAttribute('aria-pressed', String(isDark));
    toggle.setAttribute('aria-label', `Use ${isDark ? 'light' : 'dark'} theme`);
    if (label) label.textContent = isDark ? 'Light' : 'Dark';
  };

  update(theme);
  toggle?.addEventListener('click', () => {
    storedTheme = theme === 'dark' ? 'light' : 'dark';
    safeWriteTheme(storage, storedTheme);
    update(storedTheme);
  });
  media.addEventListener?.('change', (event) => {
    if (storedTheme) return;
    update(event.matches ? 'dark' : 'light');
  });
}

export function initializeReveals({ elements, reducedMotion, observerFactory }) {
  if (reducedMotion || !observerFactory) {
    elements.forEach((element) => element.classList.add('is-visible'));
    return;
  }
  const observer = observerFactory((entries, instance) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-visible');
      instance.unobserve(entry.target);
    }
  });
  elements.forEach((element) => observer.observe(element));
}

export async function submitContactForm(form, fetchImpl = fetch) {
  const response = await fetchImpl(form.action, {
    method: 'POST',
    body: new FormData(form),
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) throw new Error('Message could not be sent');
}

export function enhanceContactForm(form, fetchImpl = fetch) {
  const button = form.querySelector('[data-submit-button]');
  const label = form.querySelector('[data-submit-label]');
  const status = form.querySelector('[data-form-status]');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    button.disabled = true;
    label.textContent = 'Sending...';
    status.textContent = '';
    try {
      await submitContactForm(form, fetchImpl);
      form.reset();
      status.textContent = 'Message sent. I will get back to you soon.';
    } catch {
      status.textContent = 'Could not send the message. Email me directly instead.';
    } finally {
      button.disabled = false;
      label.textContent = 'Send message';
    }
  });
}

export function initializeSite({
  doc = document,
  root = doc.documentElement,
  storage = (() => {
    try { return globalThis.localStorage; } catch { return null; }
  })(),
  matchMediaImpl = globalThis.matchMedia,
  observerFactory = globalThis.IntersectionObserver
    ? (callback) => new globalThis.IntersectionObserver(callback, { rootMargin: '0px 0px -10%' })
    : null,
} = {}) {
  const themeMedia = matchMediaImpl('(prefers-color-scheme: dark)');
  initializeTheme({ root, toggle: doc.querySelector('[data-theme-toggle]'), storage, media: themeMedia });
  initializeReveals({
    elements: [...doc.querySelectorAll('.reveal')],
    reducedMotion: matchMediaImpl('(prefers-reduced-motion: reduce)').matches,
    observerFactory,
  });
  const contactForm = doc.querySelector('[data-contact-form]');
  if (contactForm) enhanceContactForm(contactForm);
}

if (typeof document !== 'undefined') {
  initializeSite();
}
