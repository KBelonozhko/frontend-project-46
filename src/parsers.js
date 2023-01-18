import { load } from 'js-yaml';

const parse = (filepath, extantion) => {
  switch (extantion) {
    case '.json':
      return JSON.parse(filepath);
    case '.yml':
    case '.yaml':
      return load(filepath);
    default:
      throw new Error('Wrong extantion');
  }
};

export default parse;
