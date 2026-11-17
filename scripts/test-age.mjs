#!/usr/bin/env node
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import path from 'path';

const require = createRequire(import.meta.url);
const corePath = path.join(path.dirname(fileURLToPath(import.meta.url)), '../public/assets/age-core.js');
const { getExactAge, parseCustomDateParts } = require(corePath);

const assert = (cond, msg) => {
  if (!cond) throw new Error(msg);
};

const d = (y, m, day) => new Date(y, m - 1, day);

// Normal date
{
  const birth = d(1990, 6, 15);
  const target = d(2025, 11, 17);
  const age = getExactAge(birth, target);
  assert(age.years === 35 && age.months === 5 && age.days === 2, `normal date: ${JSON.stringify(age)}`);
}

// Leap-day birthday to non-leap cutoff
{
  const birth = d(2000, 2, 29);
  const target = d(2024, 3, 1);
  const age = getExactAge(birth, target);
  assert(age.years === 24 && age.months === 0 && age.days === 1, `leap day: ${JSON.stringify(age)}`);
}

// Two-date compare (historical)
{
  const birth = d(1985, 1, 10);
  const target = d(2000, 1, 9);
  const age = getExactAge(birth, target);
  assert(age.years === 14 && age.months === 11 && age.days === 30, `compare: ${JSON.stringify(age)}`);
}

// School cutoff
{
  const birth = d(2019, 8, 20);
  const cutoff = d(2025, 9, 1);
  const age = getExactAge(birth, cutoff);
  assert(age.years === 6 && age.months === 0 && age.days === 12, `school: ${JSON.stringify(age)}`);
}

// parseCustomDateParts invalid
assert(parseCustomDateParts('31', '2', '2020') === null, 'invalid feb 31');

console.log('All age-core tests passed.');