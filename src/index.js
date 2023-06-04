import { readFileSync } from 'fs';
import path from 'path';
import parse from './parsers.js';
import getDifferenceTrees from './difftree.js';
import formatter from './formatters/index.js';

const getFixturesPath = (filename) => path.resolve(process.cwd(), filename);
const getExtantion = (filename) => path.extname(filename).slice(1);

const getData = (filepath) => parse(readFileSync(getFixturesPath(filepath), 'utf-8'), getExtantion(filepath));

export default (filepath1, filepath2, format = 'stylish') => {
  const arrObject = getDifferenceTrees(getData(filepath1), getData(filepath2));

  return formatter(arrObject, format);
};
