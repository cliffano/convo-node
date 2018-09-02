function getConversationName(payload) {
  return payload.queryResult.intent.displayName;
}

function getConversationLanguage(payload) {
  return payload.queryResult.languageCode;
}

function getConversationParams(payload) {
  return payload.queryResult.parameters;
}

function createReply(replyText) {
  return {
    fulfillmentText: replyText
  };
}

module.exports = {
  getConversationName: getConversationName,
  getConversationLanguage: getConversationLanguage,
  getConversationParams: getConversationParams,
  createReply: createReply
};
