const voca = require('voca');
const YAML = require('yaml').default;

class OpenApi3CloudFunctionsConfig {

  constructor(convoSpecString, openApi3SpecString) {
    this.convoSpec = YAML.parse(convoSpecString);
    this.openApi3Spec = YAML.parse(openApi3SpecString);
    this.summariseApis();
    this.summariseConversations();
    this.summariseSecuritySchemes();
  }

  convoSpec() {
    return this.convoSpec;
  }

  openApi3Spec() {
    return this.openApi3Spec;
  }

  id() {
    return voca.slugify(this.convoSpec.info.title);
  }

  apis() {
    return this._apis;
  }

  summariseApis() {
    const self = this;
    var hasDefaultApi = false;
    this._apis = {};

    Object.keys(this.openApi3Spec.paths).forEach(function (pathKey) {
      const methods = self.openApi3Spec.paths[pathKey];
      Object.keys(methods).forEach(function (methodKey) {
        const methodValue = methods[methodKey];
        const tags = methodValue.tags;
        if (!tags || tags.length === 0) {
          hasDefaultApi = true;
        } else {
          tags.forEach(function (tag) {
            if (!self._apis[tag]) {
              self._apis[tag] = voca.titleCase(tag) + 'Api';
            }
          });
        }
      });
    });

    // if any of the methods does not have any tag, that method is part of the default API
    if (hasDefaultApi) {
      this._apis['defaultApi'] = 'DefaultApi';
    }
  }

  conversations() {
    return this._conversations;
  }

  summariseConversations() {
    const self = this;
    this._conversations = [];

    function _getConversationApi(operationId) {
      var conversationApi = 'defaultApi';

      Object.keys(self.openApi3Spec.paths).forEach(function (pathKey) {
        const methods = self.openApi3Spec.paths[pathKey];
        Object.keys(methods).forEach(function (methodKey) {
          const methodValue = methods[methodKey];
          if (methodValue.operationId === operationId) {
            const tags = methodValue.tags;
            if (tags && tags.length > 0) {
              // multiple tags indicate that the operation is part of multiple
              // APIs, defaulting to use the first tag defined
              conversationApi = tags[0];
            }
          }
        });
      });

      return conversationApi;
    }

    this.convoSpec.conversations.forEach(function (conversation) {
      const _conversation = {
        name: conversation.name,
        messages: conversation.messages,
        reply: conversation.reply,
        api: _getConversationApi(conversation.openapi3_cloudfunctions.operation_id),
        method: conversation.openapi3_cloudfunctions.operation_id
      }
      self._conversations.push(_conversation);
    });
  }

  basicHttpAuths() {
    return this._basicHttpAuths;
  }

  hasBasicHttpAuths() {
    return (this._basicHttpAuths && this._basicHttpAuths.length > 0);
  }

  summariseSecuritySchemes() {
    const self = this;
    this._basicHttpAuths = [];
    Object.keys(this.openApi3Spec.components.securitySchemes).forEach(function (securitySchemeKey) {
      const securityScheme = self.openApi3Spec.components.securitySchemes[securitySchemeKey];
      if (securityScheme.type === 'http' && securityScheme.scheme === 'basic') {
        self._basicHttpAuths.push(securitySchemeKey);
      }
    });
  }
}

module.exports = OpenApi3CloudFunctionsConfig;
