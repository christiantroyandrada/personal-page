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

if (typeof document !== 'undefined') {
  const contactForm = document.querySelector('[data-contact-form]');
  if (contactForm) enhanceContactForm(contactForm);
}
