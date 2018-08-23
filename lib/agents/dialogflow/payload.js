function getMessageFromPayload(payload) {
  return payload.queryResult.intent.displayName;
}

function createReplyPayload(reply) {
  return {
    fulfillmentText: reply
  };
}

module.exports = {
  getMessageFromPayload: getMessageFromPayload,
  createReplyPayload: createReplyPayload
};
