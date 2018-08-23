function getConversationNameFromPayload(payload) {
  return payload.queryResult.intent.displayName;
}

function getConversationLanguageFromPayload(payload) {
  return payload.queryResult.languageCode;
}

function createReplyPayload(reply) {
  return {
    fulfillmentText: reply
  };
}

module.exports = {
  getConversationNameFromPayload: getConversationNameFromPayload,
  getConversationLanguageFromPayload: getConversationLanguageFromPayload,
  createReplyPayload: createReplyPayload
};
