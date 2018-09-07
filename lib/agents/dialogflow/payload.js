/**
 * Extract conversation name from incoming DialogFlow payload object.
 *
 * @param {Object} payload: DialogFlow payload
 * @return {String} the conversation name
 */
function getConversationName(payload) {
  return payload.queryResult.intent.displayName;
}

/**
 * Extract conversation language from incoming DialogFlow payload object.
 *
 * @param {Object} payload: DialogFlow payload
 * @return {String} the conversation language
 */
function getConversationLanguage(payload) {
  return payload.queryResult.languageCode;
}

/**
 * Extract conversation parameters from incoming DialogFlow payload object.
 *
 * @param {Object} payload: DialogFlow payload
 * @return {Object} the conversation parameters
 */
function getConversationParams(payload) {
  return payload.queryResult.parameters;
}

/**
 * Creates an outgoing DialogFlow reply payload.
 *
 * @param {String} replyText: reply text, to be sent to DialogFlow,
 * and will be voiced on the integrated devices
 */
function createReply(replyText) {
  return {
    fulfillmentText: replyText,
    payload: {
      google: {
        expectUserResponse: true,
        richResponse: {
          items: [
            {
              simpleResponse: {
                textToSpeech: replyText,
                displayText: replyText
              }
            }
          ]
        }
      },
      facebook: {
        text: replyText
      },
      slack: {
        text: replyText
      }
    }
  };
}

module.exports = {
  getConversationName: getConversationName,
  getConversationLanguage: getConversationLanguage,
  getConversationParams: getConversationParams,
  createReply: createReply
};
