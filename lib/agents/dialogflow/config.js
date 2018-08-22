const voca = require('voca');
const YAML = require('yaml').default;

class DialogFlowConfig {

  constructor(convoSpecString) {
    this.convoSpec = YAML.parse(convoSpecString);
  }

  convoSpec() {
    return this.convoSpec;
  }
}

module.exports = DialogFlowConfig;
