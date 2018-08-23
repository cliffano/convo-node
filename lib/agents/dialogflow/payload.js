function getConversationNameFromPayload(payload) {
  return payload.queryResult.intent.displayName;
}

function createReplyPayload(reply) {
  return {
    fulfillmentText: reply
  };
}

module.exports = {
  getConversationNameFromPayload: getConversationNameFromPayload,
  createReplyPayload: createReplyPayload
};
