const stringify = (values) => {
  if (typeof (values) === 'object' && values !== null) return '[complex value]';
  if (typeof (values) === 'string') return `'${values}'`;
  return `${values}`;
};

const plain = (tree, path, depth) => tree
  .filter((key) => key.type !== 'unchanged')
  .map((key) => {
    const keysPath = path ? `${path}.${key.name}` : `${key.name}`;

    switch (key.type) {
      case 'nested': {
        return plain(key.value, keysPath, depth + 1);
      }
      case 'added': {
        const value = stringify(key.value);
        return `Property '${keysPath}' was added with value: ${value}`;
      }
      case 'deleted': {
        return `Property '${keysPath}' was removed`;
      }
      case 'changed': {
        const oldValue = stringify(key.oldValue);
        const newValue = stringify(key.newValue);
        return `Property '${keysPath}' was updated. From ${oldValue} to ${newValue}`;
      }
      default: throw new Error('Something went wrong!');
    }
  })
  .join('\n');

export default (comparisonTree) => plain(comparisonTree, '', 1);
