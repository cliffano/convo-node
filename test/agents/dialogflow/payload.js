const assert = require('assert');
const dialogFlowPayload = require('../../../lib/agents/dialogflow/payload')

describe('DialogFlow Agent Payload', function() {
  describe('getConversationNameFromPayload', function() {
    it('should use intent display name as conversation name', function() {
      const payloadFromDialogFlow = {
        queryResult: {
          intent: {
            displayName: 'Some conversation'
          }
        }
      };
      assert.equal(dialogFlowPayload.getConversationName(payloadFromDialogFlow), 'Some conversation');
    });
  });
  describe('getLanguageFromPayload', function() {
    it('should use language code as conversation language', function() {
      const payloadFromDialogFlow = {
        queryResult: {
          languageCode: 'de'
        }
      };
      assert.equal(dialogFlowPayload.getConversationLanguage(payloadFromDialogFlow), 'de');
    });
  });
  describe('createReplyPayload', function() {
    it('should contain expected properties', function() {
      const payloadToDialogFlow = dialogFlowPayload.createReply('some reply');
      assert.equal(payloadToDialogFlow.fulfillmentText, 'some reply');
    });
  });
});
