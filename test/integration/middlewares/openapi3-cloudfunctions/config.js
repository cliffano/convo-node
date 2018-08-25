const assert = require('assert');
const fs = require('fs');
const Config = require('../../../../lib/middlewares/openapi3-cloudfunctions/config')

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
      assert.equal(Object.keys(this.config.apis()).includes('someTagApi'), true);
    });
  });
  describe('conversations', function() {
    it('should contain all conversations', function() {
      const conversations = this.config.conversations();
      assert.equal(conversations.length, 2);
    });
    it('should contain conversation with default API', function() {
      const conversations = this.config.conversations();
      assert.equal(conversations[1].name, 'Submitting data');
      assert.equal(conversations[1].api, 'someTagApi');
      assert.equal(conversations[1].method, 'postData2');
      assert.equal(conversations[1].reply.en, 'Finished sending your data');
      assert.equal(conversations[1].messages.en.length, 2);
      assert.equal(conversations[1].reply.de, 'Fertig Senden Ihrer Daten');
      assert.equal(conversations[1].messages.de.length, 1);
    });
    it('should contain conversation with non-default API', function() {
      const conversations = this.config.conversations();
      assert.equal(conversations[0].name, 'Retrieving data');
      assert.equal(conversations[0].api, 'defaultApi');
      assert.equal(conversations[0].method, 'getData1');
      assert.equal(conversations[0].reply.en, 'Here is your data... {data}');
      assert.equal(conversations[0].messages.en.length, 3);
      assert.equal(conversations[0].reply.de, 'Hier sind Ihre Daten ... {data}');
      assert.equal(conversations[0].messages.de.length, 1);
    });
  });
  describe('basicHttpAuths', function() {
    it('should return true when it contains basic HTTP authentications', function() {
      assert.equal(this.config.hasBasicHttpAuths(), true);
    });
    it('should retrieve basic HTTP authentications', function() {
      const basicHttpAuths = this.config.basicHttpAuths();
      assert.equal(basicHttpAuths.length, 2);
      assert.equal(basicHttpAuths[0], 'some_http_basic_auth1');
      assert.equal(basicHttpAuths[1], 'some_http_basic_auth2');
    });
  });
});
