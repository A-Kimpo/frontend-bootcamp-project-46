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

const symbols = {
  nested: '  ',
  added: '+ ',
  deleted: '- ',
  unchanged: '  ',
};

const buildString = (name, type, depth, value) => `${getStylishSpace(depth)}${symbols[type]}${name}: ${value}`;

const stylish = (comparisonTree) => {
  const iter = (tree, depth) => {
    const output = tree.map((key) => {
      const { name, type } = key;

      const value = type === 'nested'
        ? (iter(key.value, depth + 1))
        : stringify(key.value, depth + 1);

      if (type !== 'changed') {
        return buildString(name, type, depth, value);
      }

      const oldValue = stringify(key.oldValue, depth + 1);
      const newValue = stringify(key.newValue, depth + 1);

      const oldLine = buildString(name, 'deleted', depth, oldValue);
      const newLine = buildString(name, 'added', depth, newValue);

      return `${oldLine}\n${newLine}`;
    });

    return ['{', ...output, `${getBracketSpace(depth)}}`].join('\n');
  };

  return iter(comparisonTree, 1);
};

export default stylish;
