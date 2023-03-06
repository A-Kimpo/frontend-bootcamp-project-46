import fs from 'node:fs';
import path from 'node:path';
import { test, expect } from '@jest/globals';
import { genDiff } from '../src';
import parseFile from '../src/parsers';

const getPath = (fileName) => path.resolve(process.cwd(), `./__fixtures__/${fileName}`);
const readFile = (fileName) => fs.readFileSync(getPath(fileName), 'utf-8');

test('genDiffJson', () => {
  expect(genDiff(getPath('file1.json'), getPath('file2.json'))).toBe(readFile('fileRight.txt'));
});

test('genDiffYaml', () => {
  expect(genDiff(getPath('file1.yml'), getPath('file2.yaml'))).toEqual(readFile('fileRight.txt'));
});

test('parseYaml', () => {
  expect(parseFile(readFile('file1.yml'))).toBe(parseFile(readFile('file1.yaml')));
});
