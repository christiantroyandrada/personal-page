import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import { readPage } from './helpers/site.mjs';

const home = await readPage('index.html');
const css = await readFile(new URL('../css/app.css', import.meta.url), 'utf8');

const evidence = [
  {
    src: './img/projects/secure-chat.webp',
    alt: 'Docker Desktop showing the running Secure Chat services',
  },
  {
    src: './img/projects/pitaka-wallet.webp',
    alt: 'Pitaka mock wallet home showing the available balance and service shortcuts',
  },
  {
    src: './img/projects/astropipeline-cli.webp',
    alt: 'AstroPipeline terminal showing its version and available commands',
  },
];

test('each featured system includes local, stable visual evidence', async () => {
  assert.equal((home.match(/<figure class="project-visual"(?: [^>]*)?>/g) ?? []).length, 3);

  for (const item of evidence) {
    const escapedSrc = item.src.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    assert.match(home, new RegExp(`<img[^>]+src="${escapedSrc}"[^>]+alt="${item.alt}"[^>]+loading="lazy"[^>]+decoding="async"[^>]+width="[1-9]\\d*"[^>]+height="[1-9]\\d*"`));
    const asset = new URL(`../${item.src.replace('./', '')}`, import.meta.url);
    const bytes = await readFile(asset);
    assert.equal(bytes.subarray(0, 4).toString('ascii'), 'RIFF', `${item.src} must be a WebP`);
    assert.equal(bytes.subarray(8, 12).toString('ascii'), 'WEBP', `${item.src} must be a WebP`);
  }

  assert.equal((home.match(/<figcaption>/g) ?? []).length, 3);
  assert.doesNotMatch(home, /notion\.site\/image/);
});

test('technology accents keep identity in data and colour in presentation', () => {
  for (const technology of ['node', 'postgresql', 'rabbitmq', 'docker', 'prometheus', 'react', 'typescript', 'python', 'vue', 'laravel', 'svelte', 'dotnet']) {
    assert.match(home, new RegExp(`data-tech="${technology}"`));
    assert.match(css, new RegExp(`--tech-${technology}:\\s*#[0-9a-fA-F]{6}`));
  }

  assert.match(css, /\.tag\[data-tech\][\s\S]*?border-color:\s*var\(--tech-border\)/);
  assert.match(css, /\.tech-inline\[data-tech\][\s\S]*?color:\s*var\(--tech-ink\)/);
});
