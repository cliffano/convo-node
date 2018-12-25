const _ = require('lodash');
const util = require('util');

/**
 * Count the provided data.
 * If the data is an array, count how many items are in the array.
 * If the data is an object/hash, count how many keys are in the object.
 *
 * @param {Number} the data count
 */
function count(data) {
  let count;
  if (_.isArray(data)) {
    count = data.length;
  } else if (_.isObject(data) && Object.keys(data) && _.isArray(Object.keys(data))) {
    count = Object.keys(data).length;
  } else {
    throw new Error(util.format('Unable to count an unsupported data type: %s', typeof(data)));
  }
  return count;
}

module.exports = {
  count: count
}
