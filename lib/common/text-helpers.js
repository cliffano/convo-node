function count(data) {
  var count;
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
