import _ from 'lodash';

const getIndent = (depth, replacer = ' ', spaceCount = 4) => replacer.repeat(depth * spaceCount - 2);
const getBackIndent = (depth, replacer = ' ', spaceCount = 4) => replacer.repeat(depth * spaceCount);

const stringfy = (arr, depth = 1) => {
  if (!_.isObject(arr)) {
    return String(arr);
  }
  const lines = Object
    .entries(arr)
    .map(([key, val]) => `${getIndent(depth + 1)}  ${key}: ${stringfy(val, depth + 1)}`);

  return `{\n${lines.join('\n')}\n  ${getBackIndent(depth)}}`;
};

const stylish = (node, depth) => {
  const nodeLines = node.map((item) => {
    const {
      key, value, type,
    } = item;
    switch (type) {
      case 'added':
        return `${getIndent(depth)}+ ${key}: ${stringfy(value, depth + 1)}`;
      case 'deleted':
        return `${getIndent(depth)}- ${key}: ${stringfy(value, depth + 1)}`;
      case 'changed':
        return `${getIndent(depth)}- ${key}: ${stringfy(item.value1, depth + 1)}\n${getIndent(depth)}+ ${key}: ${stringfy(item.value2, depth + 1)}`;
      case 'nested':
        return `${getIndent(depth)}  ${key}: ${stylish(item.children, depth + 1)}`;
      case 'unchanged':
        return `${getIndent(depth)}  ${key}: ${stringfy(value, depth + 1)}`;
      default:
        throw new Error('Wrong type');
    }
  });

  return `{\n${nodeLines.join('\n')}\n}`;
};

export default stylish;
