import _ from 'lodash';

const replacer = ' ';
const getIndent = (depth, spaceCount = 4) => replacer.repeat(depth * spaceCount - 2);
const getBackIndent = (depth, spaceCount = 4) => replacer.repeat(depth * spaceCount);

const stringfy = (arr, depth) => {
  if (!_.isObject(arr)) {
    return String(arr);
  }
  const lines = Object
    .entries(arr)
    .map(([key, val]) => `${getIndent(depth)}  ${key}: ${stringfy(val, depth + 1)}`);

  return ['{', ...lines, `${getBackIndent(depth - 1)}}`].join('\n');
};

const stylish = (node) => {
  const iter = (currentNode, depth) => {
    const nodeLines = currentNode.map((item) => {
      const {
        key, value, type,
      } = item;
      switch (type) {
        case 'nested':
          return `${getIndent(depth)}  ${key}: {\n${iter(item.children, depth + 1)}\n${getBackIndent(depth)}}`;
        case 'added':
          return `${getIndent(depth)}+ ${key}: ${stringfy(value, depth + 1)}`;
        case 'deleted':
          return `${getIndent(depth)}- ${key}: ${stringfy(value, depth + 1)}`;
        case 'changed':
          return `${getIndent(depth)}- ${key}: ${stringfy(item.value1, depth + 1)}\n${getIndent(depth)}+ ${key}: ${stringfy(item.value2, depth + 1)}`;
        case 'unchanged':
          return `${getIndent(depth)}  ${key}: ${stringfy(value, depth + 1)}`;
        default:
          throw new Error('Wrong type');
      }
    });

    return nodeLines.join('\n');
  };

  return `{\n${iter(node, 1)}\n}`;
};

export default stylish;
