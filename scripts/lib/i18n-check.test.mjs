import { test } from 'node:test';
import assert from 'node:assert/strict';
import { missingTranslations, translationDrift } from './i18n-check.mjs';

const en = {
  'home.hero.title': { message: 'The infrastructure built for' },
  'home.hero.cta': { message: 'Sign Up' },
  'pricing.plans.free': { message: 'Free' },
};

test('missingTranslations reports an id absent from the other locale', () => {
  const other = {
    'home.hero.title': { message: '为……打造的基础设施' },
    'home.hero.cta': { message: '注册' },
  };
  assert.deepEqual(missingTranslations(en, other), ['pricing.plans.free']);
});

test('missingTranslations reports an empty or blank message', () => {
  const other = {
    'home.hero.title': { message: '' },
    'home.hero.cta': { message: '   ' },
    'pricing.plans.free': { message: '免费' },
  };
  assert.deepEqual(missingTranslations(en, other), [
    'home.hero.title',
    'home.hero.cta',
  ]);
});

test('missingTranslations returns [] for a complete file', () => {
  const other = {
    'home.hero.title': { message: '为……打造的基础设施' },
    'home.hero.cta': { message: '注册' },
    'pricing.plans.free': { message: '免费' },
  };
  assert.deepEqual(missingTranslations(en, other), []);
});

const msg = message => ({ message });

test('translationDrift returns [] when i18n/en matches the source', () => {
  const files = { 'code.json': { 'home.cta': msg('Sign Up') } };
  assert.deepEqual(translationDrift(files, structuredClone(files)), []);
});

test('translationDrift reports changed, added and removed ids', () => {
  const committed = {
    'code.json': { 'home.cta': msg('Sign up'), 'home.old': msg('Old') },
  };
  const fresh = {
    'code.json': { 'home.cta': msg('Sign Up'), 'home.new': msg('New') },
  };
  assert.deepEqual(translationDrift(committed, fresh), [
    'code.json: home.cta is "Sign up", source says "Sign Up"',
    'code.json: home.new is missing',
    'code.json: home.old is no longer in the source',
  ]);
});

test('translationDrift reports a missing or extra file', () => {
  const committed = { 'code.json': {}, 'old.json': {} };
  const fresh = { 'code.json': {}, 'navbar.json': { a: msg('A') } };
  assert.deepEqual(translationDrift(committed, fresh), [
    'navbar.json is missing',
    'old.json is no longer generated',
  ]);
});
