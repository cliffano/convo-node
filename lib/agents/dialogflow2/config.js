const voca = require('voca');
const YAML = require('yaml').default;

class DialogFlow2Config {

  constructor(convoSpecString) {
    this.convoSpec = YAML.parse(convoSpecString);
    this.setConversations();
  }

  convoSpec() {
    return this.convoSpec;
  }

  conversations() {
    return this._conversations;
  }

  setConversations() {
    const self = this;
    this._conversations = [];

    this.convoSpec.conversations.forEach(function (conversation) {
      const _conversation = {
        id: voca.slugify(conversation.name),
        name: conversation.name,
        messages: conversation.messages
      };
      self._conversations.push(_conversation);
    });
  }
}

module.exports = DialogFlow2Config;
