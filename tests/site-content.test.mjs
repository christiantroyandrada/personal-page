import assert from 'node:assert/strict';
import test from 'node:test';

import { readPage } from './helpers/site.mjs';

const home = await readPage('index.html');
const contact = await readPage('contacts.html');
const hobbies = await readPage('hobbies.html');

test('homepage uses the unified software engineering position', () => {
  assert.match(home, /builds? and operates? production systems/i);
  assert.match(home, /Pragmatic[\s\S]*Resourceful[\s\S]*Adaptive/i);
});

test('homepage leads with bounded production evidence', () => {
  for (const evidence of ['46', '64', '19', '95%']) assert.match(home, new RegExp(`>${evidence}<`));
  assert.match(home, /merged PRs/i);
  assert.match(home, /teammate PRs reviewed/i);
});

test('homepage features the three strongest public systems', () => {
  assert.match(home, /chat-microservices/);
  assert.match(home, /pitaka-app/);
  assert.match(home, /aporn-tool/);
  assert.doesNotMatch(home, /vue-news|filta-frontend-assessment|eturnity_vue_challenge/);
});

test('learning and operational experience remain honestly bounded', () => {
  assert.match(home, /React[\s\S]*\.NET[\s\S]*(learning|exploring)/i);
  assert.doesNotMatch(home, /senior devops|devops expert|sre expert/i);
});

test('critical navigation and project links are present in HTML', () => {
  for (const id of ['proof', 'systems', 'experience', 'range', 'contact-cta']) {
    assert.match(home, new RegExp(`id=["']${id}["']`));
  }
});

test('contact page keeps direct professional fallbacks and the existing form endpoint', () => {
  assert.match(contact, /mailto:christiantroyandrada@gmail\.com/);
  assert.match(contact, /linkedin\.com\/in\/christiantroyandrada/);
  assert.match(contact, /github\.com\/christiantroyandrada/);
  assert.match(contact, /action=["']https:\/\/formspree\.io\/f\/xnnevgjg["']/);
  assert.match(contact, /method=["']POST["']/i);
  assert.doesNotMatch(contact, /Facebook|Instagram/);
});

test('hobbies page is a personal appendix with an honest AstroPipeline connection', () => {
  for (const interest of ['Astrophotography', 'Music', 'Gaming', 'Coffee', 'Outdoors']) {
    assert.match(hobbies, new RegExp(interest, 'i'));
  }
  assert.match(hobbies, /aporn-tool/);
  assert.doesNotMatch(hobbies, /wikipedia\.org|google\.com\/maps\/search/);
});

test('supporting pages share the primary navigation and theme control', () => {
  for (const html of [contact, hobbies]) {
    assert.match(html, /class=["'][^"']*site-header/);
    assert.match(html, /data-theme-toggle/);
    assert.match(html, /href=["']\.\/index\.html/);
  }
});
