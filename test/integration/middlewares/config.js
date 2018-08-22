const assert = require('assert');
const fs = require('fs');
const Config = require('../../../lib/middlewares/openapi3-cloudfunctions/config')

describe('OpenAPI3-CloudFunctions Middleware Config', function() {
  beforeEach(function () {
    const convoSpecString = fs.readFileSync('test/fixtures/convo.yaml', 'utf8');
    const openApi3SpecString = fs.readFileSync('test/fixtures/openapi3.yaml', 'utf8');
    this.config = new Config(convoSpecString, openApi3SpecString);
  });
  describe('apis', function() {
    it('should contain default API', function() {
      assert.equal(Object.keys(this.config.apis()).includes('defaultApi'), true);
    });
    it('should contain non-default API based on the tag', function() {
      assert.equal(Object.keys(this.config.apis()).includes('someTag'), true);
    });
  });
  describe('conversations', function() {
    it('should contain all conversations', function() {
      const conversations = this.config.conversations();
      assert.equal(conversations.length, 2);
    });
    it('should contain conversation with default API', function() {
      const conversations = this.config.conversations();
      assert.equal(conversations[1].api, 'someTag');
      assert.equal(conversations[1].method, 'postData2');
      assert.equal(conversations[1].reply, 'Finished sending your data');
      assert.equal(conversations[1].messages.length, 2);
    });
    it('should contain conversation with non-default API', function() {
      const conversations = this.config.conversations();
      assert.equal(conversations[0].api, 'defaultApi');
      assert.equal(conversations[0].method, 'getData1');
      assert.equal(conversations[0].reply, 'Here is your data... {data}');
      assert.equal(conversations[0].messages.length, 3);
    });
  });
});
