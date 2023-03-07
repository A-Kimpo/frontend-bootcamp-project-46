import yaml from 'js-yaml';

const parseFile = (file, extension) => {
  if (extension === 'json') return JSON.parse(file);
  if (extension === 'yaml' || extension === 'yml') return yaml.load(file);
  return 'Unknown extension';
};

export default parseFile;
