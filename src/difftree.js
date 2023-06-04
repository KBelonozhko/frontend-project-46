import _ from 'lodash';

const getDifferenceTrees = (dataObj1, dataObj2) => {
  const keys1 = Object.keys(dataObj1);
  const keys2 = Object.keys(dataObj2);
  const keys = _.sortBy(_.union(keys1, keys2));

  const diffTrees = keys.map((key) => {
    if (_.isObject(dataObj1[key]) && _.isObject(dataObj2[key])) {
      return { key, children: getDifferenceTrees(dataObj1[key], dataObj2[key]), type: 'nested' };
    }
    if (!Object.hasOwn(dataObj1, key)) {
      return { key, value: dataObj2[key], type: 'added' };
    }
    if (!Object.hasOwn(dataObj2, key)) {
      return { key, value: dataObj1[key], type: 'deleted' };
    }
    if (dataObj1[key] !== dataObj2[key]) {
      return {
        key, value1: dataObj1[key], value2: dataObj2[key], type: 'changed',
      };
    }
    return { key, value: dataObj2[key], type: 'unchanged' };
  });

  return diffTrees;
};

export default getDifferenceTrees;
