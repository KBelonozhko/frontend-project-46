import _ from 'lodash';

const replacer = ' ';
const indentCount = 2;
const depthStep = 1;
const getIndent = (depth, spaceCount = 4) => replacer.repeat(depth * spaceCount - indentCount);
const getBackIndent = (depth, spaceCount = 4) => replacer.repeat(depth * spaceCount);

const stringfy = (arr, depth) => {
  if (!_.isObject(arr)) {
    return String(arr);
  }
  const lines = Object
    .entries(arr)
    .map(([key, val]) => `${getIndent(depth)}  ${key}: ${stringfy(val, depth + depthStep)}`);

  return ['{', ...lines, `${getBackIndent(depth - depthStep)}}`].join('\n');
};

const stylish = (node, defaultDepth = 1) => {
  const iter = (currentNode, depth) => {
    const nodeLines = currentNode.map((item) => {
      const {
        key, value, type,
      } = item;
      switch (type) {
        case 'nested':
          return `${getIndent(depth)}  ${key}: {\n${iter(item.children, depth + depthStep)}\n${getBackIndent(depth)}}`;
        case 'added':
          return `${getIndent(depth)}+ ${key}: ${stringfy(value, depth + depthStep)}`;
        case 'deleted':
          return `${getIndent(depth)}- ${key}: ${stringfy(value, depth + depthStep)}`;
        case 'changed':
          return [`${getIndent(depth)}- ${key}: ${stringfy(item.value1, depth + depthStep)}`,
            `${getIndent(depth)}+ ${key}: ${stringfy(item.value2, depth + depthStep)}`].join('\n');
        case 'unchanged':
          return `${getIndent(depth)}  ${key}: ${stringfy(value, depth + depthStep)}`;
        default:
          throw new Error('Wrong type');
      }
    });

    return nodeLines.join('\n');
  };

  return `{\n${iter(node, defaultDepth)}\n}`;
};

export default stylish;
