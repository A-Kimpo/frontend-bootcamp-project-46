import json from './json.js';
import plain from './plain.js';
import stylish from './stylish.js';

export default (tree, format) => {
  switch (format) {
    case 'stylish': return stylish(tree);

    case 'plain': return plain(tree);

    case 'json': return json(tree);

    default: return 'Please choose supported formatter!';
  }
};
