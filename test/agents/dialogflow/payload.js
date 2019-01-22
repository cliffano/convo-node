const assert = require('assert');
const dialogFlowPayload = require('../../../lib/agents/dialogflow/payload');

describe('DialogFlow Agent Payload', function() {
  describe('getQueryNameFromPayload', function() {
    it('should use intent display name as query name', function() {
      const payloadFromDialogFlow = {
        queryResult: {
          intent: {
            displayName: 'Some query'
          }
        }
      };
      assert.equal(dialogFlowPayload.getQueryName(payloadFromDialogFlow), 'Some query');
    });
  });
  describe('getLanguageFromPayload', function() {
    it('should use language code as query language', function() {
      const payloadFromDialogFlow = {
        queryResult: {
          languageCode: 'de'
        }
      };
      assert.equal(dialogFlowPayload.getQueryLanguage(payloadFromDialogFlow), 'de');
    });
  });
  describe('getQueryParams', function() {
    it('should pass query parameters', function() {
      const payloadFromDialogFlow = {
        queryResult: {
          parameters: {
            foo: 'bar'
          }
        }
      };
      assert.equal(dialogFlowPayload.getQueryParams(payloadFromDialogFlow).foo, 'bar');
    });
  });
  describe('createReplyPayload', function() {
    it('should contain expected properties', function() {
      const payloadToDialogFlow = dialogFlowPayload.createReply('some reply');
      assert.equal(payloadToDialogFlow.fulfillmentText, 'some reply');
    });
  });
});
