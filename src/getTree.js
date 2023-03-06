import _ from 'lodash';
import { readFile } from './index.js';
import stringify from './stringify.js';

const getTree = (object1, object2) => {
  const getUnionKeys = _.sortBy(_.union(Object.keys(object1), Object.keys(object2)));
  return getUnionKeys.map((key) => {
    if (_.isObject(object1[key]) && _.isObject(object2[key])) {
      return { name: key, children: getTree(object1[key], object2[key]), type: 'nested' };
    }
    if (!Object.hasOwn(object2, key)) {
      return { name: key, value: object1[key], type: 'deleted' };
    }
    if (!Object.hasOwn(object1, key)) {
      return { name: key, value: object2[key], type: 'added' };
    }
    if (object1[key] === object2[key]) {
      return { name: key, value: object1[key], type: 'unchanged' };
    } return { name: key, value: object1[key], type: 'changed' };
  });
};
const a = JSON.parse(readFile('./__fixtures__/fileNested1.json'));
const b = JSON.parse(readFile('./__fixtures__/fileNested2.json'));
console.log(stringify(getTree(a, b)));

export default getTree;
