const assert = require('assert');
const TextRenderer = require('../../lib/common/text-renderer');

describe('TextRenderer', function() {
  beforeEach(function () {
    this.textRenderer = new TextRenderer();
  });
  describe('renderText', function() {
    it('should render String param', function() {
      this.textRenderer.addParams({
        data: 'Some Data'
      });
      assert.equal(this.textRenderer.renderText('Hello {{data}} World'), 'Hello Some Data World');
    });
    it('should render Object property param', function() {
      this.textRenderer.addParams({
        data: {
          foo: {
            bar: 'Some Data'
          }
        }
      });
      assert.equal(this.textRenderer.renderText('Hello {{data.foo.bar}} World'), 'Hello Some Data World');
    });
  });
});
