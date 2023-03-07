import _ from 'lodash';

const getTree = (object1, object2) => {
  const unionKeys = _.sortBy(_.union(Object.keys(object1), Object.keys(object2)));
  return unionKeys.map((key) => {
    if (_.isObject(object1[key]) && _.isObject(object2[key])) {
      return {
        name: key, value: getTree(object1[key], object2[key]), type: 'nested',
      };
    }
    if (!Object.hasOwn(object2, key)) {
      return {
        name: key, value: object1[key], type: 'deleted',
      };
    }
    if (!Object.hasOwn(object1, key)) {
      return {
        name: key, value: object2[key], type: 'added',
      };
    }
    if (object1[key] === object2[key]) {
      return {
        name: key, value: object1[key], type: 'unchanged',
      };
    } return {
      name: key, oldValue: object1[key], newValue: object2[key], type: 'changed',
    };
  });
};

export default getTree;
