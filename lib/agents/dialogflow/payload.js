/**
 * Extract query name from incoming DialogFlow payload object.
 *
 * @param {Object} payload: DialogFlow payload
 * @return {String} the query name
 */
function getQueryName(payload) {
  return payload.queryResult.intent.displayName;
}

/**
 * Extract query language from incoming DialogFlow payload object.
 *
 * @param {Object} payload: DialogFlow payload
 * @return {String} the query language
 */
function getQueryLanguage(payload) {
  return payload.queryResult.languageCode;
}

/**
 * Extract query parameters from incoming DialogFlow payload object.
 *
 * @param {Object} payload: DialogFlow payload
 * @return {Object} the query parameters
 */
function getQueryParams(payload) {
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
  getQueryName: getQueryName,
  getQueryLanguage: getQueryLanguage,
  getQueryParams: getQueryParams,
  createReply: createReply
};
