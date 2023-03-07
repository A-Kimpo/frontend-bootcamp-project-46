import fs from 'node:fs';
import path from 'node:path';
import parseFile from './parsers.js';
import getTree from './getTree.js';
import getFormatter from './formatters/getFormatter.js';

const readFile = (filepath) => fs.readFileSync(path.resolve(process.cwd(), filepath), 'utf-8');
const getExtension = (filepath) => (path.resolve(process.cwd(), filepath)).split('.').pop();

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const file1 = readFile(filepath1);
  const file2 = readFile(filepath2);
  const extensionFile1 = getExtension(filepath1);
  const extensionFile2 = getExtension(filepath2);
  const object1 = parseFile(file1, extensionFile1);
  const object2 = parseFile(file2, extensionFile2);
  const tree = getTree(object1, object2);
  const formattedTree = getFormatter(tree, format);
  return formattedTree;
};

export default genDiff;
