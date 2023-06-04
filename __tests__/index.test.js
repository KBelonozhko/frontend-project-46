import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test.each([
  ['filenested1.json', 'filenested2.json', 'testNestedFile.txt', 'stylish'],
  ['filenested1.yaml', 'filenested2.yaml', 'testNestedFile.txt', 'stylish'],
  ['filenested1.json', 'filenested2.json', 'testPlainFile.txt', 'plain'],
  ['filenested1.yaml', 'filenested2.yaml', 'testPlainFile.txt', 'plain'],
  ['filenested1.json', 'filenested2.json', 'testJSONFile.txt', 'json'],
  ['filenested1.yaml', 'filenested2.yaml', 'testJSONFile.txt', 'json'],
])('test formatters comparison', (file1, file2, testFile, format) => {
  expect(genDiff(getFixturePath(file1), getFixturePath(file2), format)).toEqual(readFile(testFile));
});
