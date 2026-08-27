import assert from 'node:assert/strict';
import test from 'node:test';

import { readPage } from './helpers/site.mjs';

const home = await readPage('index.html');

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
