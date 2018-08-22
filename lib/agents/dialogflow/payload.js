function createReplyPayload(reply) {
  return {
    fulfillmentText: reply
  };
}

modules.exports = {
  createReplyPayload: createReplyPayload
};
