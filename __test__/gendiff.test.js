import fs from 'node:fs';
import path from 'node:path';
import { test, expect } from '@jest/globals';
import genDiff from '../src';

const getPath = (fileName) => path.resolve(process.cwd(), `./__fixtures__/${fileName}`);
const readFile = (fileName) => fs.readFileSync(getPath(fileName), 'utf-8');

test('genDiffNested', () => {
  expect(genDiff(getPath('fileNested1.json'), getPath('fileNested2.json'))).toEqual(readFile('fileRightStylish.txt'));
});

test('genDiffNestedYaml', () => {
  expect(genDiff(getPath('fileNested1.yml'), getPath('fileNested2.yaml'))).toEqual(readFile('fileRightStylish.txt'));
});
