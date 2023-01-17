import { readFileSync } from 'fs';
import path from 'path';
import _ from 'lodash';

const getDifferenceTrees = (dataObj1, dataObj2) => {
  const keys1 = Object.keys(dataObj1);
  const keys2 = Object.keys(dataObj2);
  const keys = _.sortBy(_.union(keys1, keys2));

  const diffTrees = keys.map((key) => {
    if (!Object.hasOwn(dataObj1, key)) {
      return { key, value: dataObj2[key], type: 'added' };
    } if (!Object.hasOwn(dataObj2, key)) {
      return { key, value: dataObj1[key], type: 'deleted' };
    } if (dataObj1[key] !== dataObj2[key]) {
      return { key, value: [dataObj1[key], dataObj2[key]], type: 'changed' };
    }
    return { key, value: dataObj1[key], type: 'unchanged' };
  });

  return diffTrees;
};

const stringfy = (arr) => {
  const lines = arr.map((item) => {
    switch (item.type) {
      case 'added':
        return `  + ${item.key}: ${item.value}`;
      case 'deleted':
        return `  - ${item.key}: ${item.value}`;
      case 'changed':
        return [`  - ${item.key}: ${item.value[0]}\n  + ${item.key}: ${item.value[1]}`];
      case 'unchanged':
        return `    ${item.key}: ${item.value}`;
      default:
        throw new Error('Wrong type');
    }
  });
  return ['{', ...lines, '}'].join('\n');
};

export default (filepath1, filepath2) => {
  const getFixturesPath = (filename) => path.resolve(process.cwd(), filename);

  const data1 = readFileSync(getFixturesPath(filepath1), 'utf-8');
  const data2 = readFileSync(getFixturesPath(filepath2), 'utf-8');

  const dataParse1 = JSON.parse(data1);
  const dataParse2 = JSON.parse(data2);
  const arrObjects = getDifferenceTrees(dataParse1, dataParse2);

  return stringfy(arrObjects);
};
