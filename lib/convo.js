const dialogFlowHttp = require('./agents/dialogflow/http');
const dialogFlowPayload = require('./agents/dialogflow/payload');
const textHelpers = require('./common/text-helpers');
const TextRenderer = require('./common/text-renderer');

module.exports = {
  dialogFlow: {
    http: dialogFlowHttp,
    payload: dialogFlowPayload
  },
  textHelpers: textHelpers,
  TextRenderer: TextRenderer
};
