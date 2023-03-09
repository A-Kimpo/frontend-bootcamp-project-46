import _ from 'lodash';

const getAdditionDiff = (object, key) => ({
  name: key, value: object[key], type: 'added',
});

const getDeletionDiff = (object, key) => ({
  name: key, value: object[key], type: 'deleted',
});

const getUnchangedDiff = (object, key) => ({
  name: key, value: object[key], type: 'unchanged',
});

const getChangedDiff = (object1, object2, key) => ({
  name: key, oldValue: object1[key], newValue: object2[key], type: 'changed',
});

const getTree = (object1, object2) => {
  const unionKeys = _.sortBy(_.union(Object.keys(object1), Object.keys(object2)));
  return unionKeys.map((key) => {
    if (_.isObject(object1[key]) && _.isObject(object2[key])) {
      const nestedObject = {
        name: key,
        value: getTree(object1[key], object2[key]),
        type: 'nested',
      };
      return nestedObject;
    }

    if (!Object.hasOwn(object1, key)) {
      return getAdditionDiff(object2, key);
    }

    if (!Object.hasOwn(object2, key)) {
      return getDeletionDiff(object1, key);
    }

    const comparisonValue = object1[key] === object2[key]
      ? getUnchangedDiff(object1, key)
      : getChangedDiff(object1, object2, key);
    return comparisonValue;
  });
};

export default getTree;
