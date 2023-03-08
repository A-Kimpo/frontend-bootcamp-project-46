const stringify = (objectValue) => {
  if (typeof (objectValue) === 'object' && objectValue !== null) return '[complex value]';
  if (typeof (objectValue) === 'string') return `'${objectValue}'`;
  return `${objectValue}`;
};

const plain = (comparisonTree) => {
  const iter = (tree, path, depth) => {
    const summary = tree
      .filter((key) => key.type !== 'unchanged')
      .map((key) => {
        const newPath = [path, key.name].join('.');
        const pathKeys = newPath.slice(1);
        const value = stringify(key.value);
        const oldValue = stringify(key.oldValue);
        const newValue = stringify(key.newValue);
        if (key.type === 'nested') {
          return iter(key.value, newPath, depth + 1);
        }
        if (key.type === 'deleted') {
          return `Property '${pathKeys}' was removed`;
        }
        if (key.type === 'changed') {
          return `Property '${pathKeys}' was updated. From ${oldValue} to ${newValue}`;
        }
        if (key.type === 'added') {
          return `Property '${pathKeys}' was added with value: ${value}`;
        }
        throw new Error('Something went wrong!');
      });
    return [...summary].join('\n');
  };
  return iter(comparisonTree, '', 1);
};

export default plain;
