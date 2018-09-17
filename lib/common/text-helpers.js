/**
 * Count the provided data.
 * If the data is an array, count how many items in the array.
 * If the data is an object/hash, count how many keys in the object.
 *
 * @param {Number} the data count
 */
function count(data) {
  let count;
  if (Array.isArray(data)) {
    count = data.length;
  } else if (Array.isArray(Object.keys(data))) {
    count = Object.keys(data).length;
  } else {
    // TODO
  }
  return count;
}

module.exports = {
  count: count
}
