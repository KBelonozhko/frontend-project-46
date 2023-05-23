const stringfy = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return value;
};

const plain = (node) => {
  const iter = (currentNode, depth = '') => {
    const nodeLines = currentNode.map((item) => {
      const { key, value, type } = item;
      switch (type) {
        case 'nested':
          return iter(item.children, `${depth}${key}.`);
        case 'added':
          return `Property '${depth}${key}' was added with value: ${stringfy(value)}`;
        case 'deleted':
          return `Property '${depth}${key}' was removed`;
        case 'changed':
          return `Property '${depth}${key}' was updated. From ${stringfy(item.value1)} to ${stringfy(item.value2)}`;
        case 'unchanged':
          return null;
        default:
          throw new Error('Wrong type');
      }
    });
    const result = nodeLines.filter((item) => item !== null);

    return result.join('\n');
  };

  return iter(node);
};
export default plain;
