import _ from 'lodash';
import fs from 'node:fs';
import path from 'node:path';

const readFile = (filepath) => fs.readFileSync(path.resolve(process.cwd(), filepath), 'utf-8');

const getExtension = (filepath) => (path.resolve(process.cwd(), filepath)).split('.').pop();

const parseFile = (file, extension) => extension === 'json' ? JSON.parse(file) : 'Unknown';

const genDiff = (filepath1, filepath2) => {
  const file1 = readFile(filepath1);
  const file2 = readFile(filepath2);
  const extension1 = getExtension(filepath1)
  const extension2 = getExtension(filepath2)
  const object1 = parseFile(file1, extension1);
  const object2 = parseFile(file2, extension2);
  const combinedKeysOfObjects = _.sortBy(_.union(Object.keys(object1), Object.keys(object2)));
  let objectString = '{';
  combinedKeysOfObjects.forEach((key) => {
      if (!Object.hasOwn(object2, key)) {
        objectString += `\n- ${key}: ${object1[key]}`;
    } else if (!Object.hasOwn(object1, key)) {
      objectString += `\n+ ${key}: ${object2[key]}`;
    } else if (object1[key] === object2[key]) {
      objectString += `\n  ${key}: ${object1[key]}`;
    } else {
      objectString += `\n- ${key}: ${object1[key]}\n+ ${key}: ${object2[key]}`;
    }
  });
  objectString += `\n}`;
  return objectString;
};

export default genDiff;