const _ = require('underscore');
const Mustache = require('mustache');

class TextRenderer {

  constructor() {
    this.params = {};
  }

  addParams(params) {
    this.params = _.extend(this.params, params);
  }

  renderText(text) {
    return Mustache.render(text, this.params);
  }

}

module.exports = TextRenderer;
