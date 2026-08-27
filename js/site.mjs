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
