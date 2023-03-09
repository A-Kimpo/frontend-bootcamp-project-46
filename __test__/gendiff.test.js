import fs from 'node:fs';
import path from 'node:path';
import { test, expect } from '@jest/globals';
import genDiff from '../src';

const getPath = (fileName) => path.resolve(process.cwd(), `./__fixtures__/${fileName}`);
const readFile = (fileName) => fs.readFileSync(getPath(fileName), 'utf-8');

const files = [
  ['fileNested1.json', 'fileNested2.json', 'stylish', 'fileRightStylish.txt'],
  ['fileNested1.yml', 'fileNested2.yaml', 'stylish', 'fileRightStylish.txt'],
  ['fileNested1.json', 'fileNested2.json', 'plain', 'fileRightPlain.txt'],
  ['fileNested1.yml', 'fileNested2.yaml', 'plain', 'fileRightPlain.txt'],
  ['fileNested1.json', 'fileNested2.json', 'json', 'fileRight.json'],
  ['fileNested1.yml', 'fileNested2.yaml', 'json', 'fileRight.json'],
];

test.each(files)('genDiff compare %p %p %p', (file1, file2, format, expected) => {
  expect(genDiff(getPath(file1), getPath(file2), format)).toBe(readFile(expected));
});
