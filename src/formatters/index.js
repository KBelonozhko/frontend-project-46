import stylish from './stylish.js';
import plain from './plain.js';

const formatter = (diff, format) => {
  switch (format) {
    case 'stylish':
      return stylish(diff, 1);
    case 'plain':
      return plain(diff);
    default:
      throw new Error('Wrong format!');
  }
};

export default formatter;
