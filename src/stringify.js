const stringify = (value, replacer = ' ', spacesCount = 1) => {
  const iter = (objectValue, depth) => {
    if (typeof (objectValue) !== 'object' || objectValue === null) {
      return `${objectValue}`;
    }
    let objectString = '{\n';
    const increasedSize = spacesCount * depth;
    const space = replacer.repeat(increasedSize);
    const bracketSpace = replacer.repeat(increasedSize - spacesCount);
    Object.keys(objectValue).map((key) => {
      objectString += `${space}`;
      objectString += `${key}: ${iter(objectValue[key], depth + 1)}`;
      objectString += '\n';
      return objectString;
    });
    objectString += `${bracketSpace}}`;
    return objectString;
  };
  return iter(value, 1);
};

export default stringify;
