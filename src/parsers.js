import yaml from 'js-yaml';

const parseFile = (file, extension) => {
  const extLowerCase = extension.toLowerCase();
  if (extLowerCase === 'json') return JSON.parse(file);
  if (extLowerCase === 'yaml' || extension === 'yml') return yaml.load(file);
  throw new Error('Unknown extension!\nProgram working with "json" or "yml" extension.');
};

export default parseFile;
