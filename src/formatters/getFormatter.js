import stylish from './stylish.js';

export default (tree, format) => {
  if (format === 'stylish') return stylish(tree);
  return 'Please choose supported formatter';
};
