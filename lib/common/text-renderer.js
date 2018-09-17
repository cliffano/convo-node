const _ = require('lodash');
const Mustache = require('mustache');

/**
 * This class renders text with a number of parameters.
 * It allows parameters being added multiple times and rendering to be applied
 * at different state of parameters.
 */
class TextRenderer {

  /**
   * Initialises an empty parameters object.
   */
  constructor() {
    this.params = {};
  }

  /**
   * Add parameters key value pairs to the renderer.
   * The key is the parameter name, the value can be a string, a number, a boolean, or a function.
   *
   * @param {Object} params: parameters key value pairs
   */
  addParams(params) {
    this.params = _.extend(this.params, params);
  }

  /**
   * Render the text, replaces the parameter names within the text with the corresponding value.
   * Parameter names must be enclosed with double curly brackets, e.g. "My name is {{name}}"
   *
   * @param {String} text: the text to be rendered
   */
  renderText(text) {
    return Mustache.render(text, this.params);
  }
}

module.exports = TextRenderer;
