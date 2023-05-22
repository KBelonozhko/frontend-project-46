import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('JSON comparison', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(readFile('testFile.txt'));
});

test('yml comparison', () => {
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))).toEqual(readFile('testFile.txt'));
});

test('JSON comparison', () => {
  expect(genDiff(getFixturePath('filenested1.json'), getFixturePath('filenested2.json'))).toEqual(readFile('testNestedFile.txt'));
});

test('yaml comparison', () => {
  expect(genDiff(getFixturePath('filenested1.yaml'), getFixturePath('filenested2.yaml'))).toEqual(readFile('testNestedFile.txt'));
});

test('plain yaml comparison', () => {
  expect(genDiff(getFixturePath('filenested1.yaml'), getFixturePath('filenested2.yaml'), 'plain')).toEqual(readFile('testPlainFile.txt'));
});

test('plain json comparison', () => {
  expect(genDiff(getFixturePath('filenested1.json'), getFixturePath('filenested2.json'), 'plain')).toEqual(readFile('testPlainFile.txt'));
});
