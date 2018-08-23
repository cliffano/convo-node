const assert = require('assert');
const dialogFlowPayload = require('../../../../lib/agents/dialogflow/payload')

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
      assert.equal(dialogFlowPayload.getConversationNameFromPayload(payloadFromDialogFlow), 'Some conversation');
    });
  });
  describe('createReplyPayload', function() {
    it('should contain expected properties', function() {
      const payloadToDialogFlow = dialogFlowPayload.createReplyPayload('some reply');
      assert.equal(payloadToDialogFlow.fulfillmentText, 'some reply');
    });
  });
});
