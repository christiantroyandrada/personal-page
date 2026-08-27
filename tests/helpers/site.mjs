import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

export const SITE_PAGES = ['index.html', 'contacts.html', 'hobbies.html'];
export const ROOT = fileURLToPath(new URL('../../', import.meta.url));

export function readPage(page) {
  return readFile(new URL(`../../${page}`, import.meta.url), 'utf8');
}

export function readCss() {
  return readFile(new URL('../../css/app.css', import.meta.url), 'utf8');
}

export function getMeta(html, attribute, value) {
  const pattern = new RegExp(`<meta\\s+[^>]*${attribute}=["']${value}["'][^>]*content=["']([^"']+)["'][^>]*>`, 'i');
  return html.match(pattern)?.[1] ?? null;
}

export function getJsonLd(html) {
  const match = html.match(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/i);
  return match ? JSON.parse(match[1]) : null;
}
