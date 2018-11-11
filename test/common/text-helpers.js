const assert = require('assert');
const textHelpers = require('../../lib/common/text-helpers')

describe('TextHelpers', function() {
  describe('count', function() {
    it('should count how many items if data is an array', function() {
      let count = textHelpers.count(['foo', 'bar']);
      assert.equal(count, 2);
    });
    it('should count how many keys if data is an object with keys', function() {
      let count = textHelpers.count({
        key1: 'value1',
        key2: 'value2',
        key3: 'value3'
      });
      assert.equal(count, 3);
    });
    it('should throw an error when data is unsupported', function() {
      try {
        textHelpers.count(0);
      } catch (e) {
        assert.equal(e.message, 'Unable to count an unsupported data type: number');
      }
    });
  });
});
