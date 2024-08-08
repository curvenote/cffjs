import { describe, expect, test } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import { validateCFF, validateCFFFile } from './validate';

type TestFile = {
  cases: TestCase[];
};

type TestCase = {
  title: string;
  cff: any;
  fail?: boolean;
};

const caseList = yaml.load(
  fs.readFileSync(path.join(__dirname, 'test_cases.yml')).toString(),
) as TestFile;

describe('validate CFF', () => {
  caseList.cases.forEach(({ title, cff, fail }) => {
    test(title, async () => {
      if (fail) {
        expect(() => validateCFF(cff)).toThrow();
      } else {
        expect(validateCFF(cff)).toBeTruthy();
      }
    });
  });
});

describe('validate CFF file', () => {
  test('example CITATION.cff file validates', async () => {
    expect(validateCFFFile(__dirname)).toBeTruthy();
  });
});
