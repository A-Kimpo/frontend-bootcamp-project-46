const spacesCount = 4;

const getStylishSpace = (count) => ' '.repeat(spacesCount * count - 2);

const getStringifySpace = (count) => ' '.repeat(spacesCount * count);

const getBracketSpace = (count) => ' '.repeat(spacesCount * count - spacesCount);

const stringify = (values, depth) => {
  if (typeof (values) !== 'object' || values === null) {
    return `${values}`;
  }
  const lines = Object
    .entries(values)
    .map(([key, value]) => `${getStringifySpace(depth)}${key}: ${stringify(value, depth + 1)}`);
  return ['{', ...lines, `${getBracketSpace(depth)}}`].join('\n');
};

const stylish = (comparisonTree) => {
  const iter = (tree, depth) => {
    const output = tree.map((key) => {
      if (key.type === 'nested') {
        return `${getStylishSpace(depth)}  ${key.name}: ${iter(key.value, depth + 1)}`;
      }
      if (key.type === 'added') {
        return `${getStylishSpace(depth)}+ ${key.name}: ${stringify(key.value, depth + 1)}`;
      }
      if (key.type === 'deleted') {
        return `${getStylishSpace(depth)}- ${key.name}: ${stringify(key.value, depth + 1)}`;
      }
      if (key.type === 'unchanged') {
        return `${getStylishSpace(depth)}  ${key.name}: ${stringify(key.value, depth + 1)}`;
      }
      if (key.type === 'changed') {
        const before = `${getStylishSpace(depth)}- ${key.name}: ${stringify(key.oldValue, depth + 1)}`;
        const after = `${getStylishSpace(depth)}+ ${key.name}: ${stringify(key.newValue, depth + 1)}`;
        return `${before}\n${after}`;
      }
      throw new Error('Something went wrong!');
    });
    return ['{', ...output, `${getBracketSpace(depth)}}`].join('\n');
  };
  return iter(comparisonTree, 1);
};

export default stylish;
