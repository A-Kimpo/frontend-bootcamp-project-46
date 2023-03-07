const getSpace = (count) => {
  const spacesCount = 4;
  const intend = ' '.repeat(spacesCount * count - 2);
  return intend;
};

const getBracketSpace = (count) => {
  const spacesCount = 4;
  const intend = ' '.repeat(spacesCount * count - spacesCount);
  return intend;
};

const stringify = (value, startDepth) => {
  const iter = (objectValue, depth) => {
    if (typeof (objectValue) !== 'object' || objectValue === null) {
      return `${objectValue}`;
    }
    let objectString = '{\n';
    const replacer = ' ';
    const spacesCount = 4;
    const increasedSize = spacesCount * depth;
    const space = replacer.repeat(increasedSize);
    const bracketSpace = replacer.repeat(increasedSize - spacesCount);
    Object.keys(objectValue).map((key) => {
      objectString += `${space}${key}: ${iter(objectValue[key], depth + 1)}\n`;
      return objectString;
    });
    objectString += `${bracketSpace}}`;
    return objectString;
  };
  return iter(value, startDepth);
};

const stylish = (comparisonTree) => {
  const iter = (tree, depth) => {
    const output = tree.map((key) => {
      const space = getSpace(depth);
      if (key.type === 'nested') {
        return `${space}  ${key.name}: ${iter(key.value, depth + 1)}`;
      }
      if (key.type === 'added') {
        return `${space}+ ${key.name}: ${stringify(key.value, depth + 1)}`;
      }
      if (key.type === 'deleted') {
        return `${space}- ${key.name}: ${stringify(key.value, depth + 1)}`;
      }
      if (key.type === 'unchanged') {
        return `${space}  ${key.name}: ${stringify(key.value, depth + 1)}`;
      }
      if (key.type === 'changed') {
        return `${space}- ${key.name}: ${stringify(key.oldValue, depth + 1)}\n${space}+ ${key.name}: ${stringify(key.newValue, depth + 1)}`;
      }
      throw new Error('Something went wrong!');
    });
    return ['{', ...output, `${getBracketSpace(depth)}}`].join('\n');
  };
  return iter(comparisonTree, 1);
};

export default stylish;
