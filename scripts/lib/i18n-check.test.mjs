import { test } from 'node:test';
import assert from 'node:assert/strict';
import { missingTranslations } from './i18n-check.mjs';

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
