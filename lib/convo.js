const DialogFlowConfig = require('./agents/dialogflow/config');
const dialogFlowHttp = require('./agents/dialogflow/http');
const dialogFlowPayload = require('./agents/dialogflow/payload');
const OpenApi3CloudFunctionsConfig = require('./middlewares/openapi3-cloudfunctions/config');

module.exports = {
  dialogFlow: {
    Config: DialogFlowConfig,
    http: dialogFlowHttp,
    payload: dialogFlowPayload
  },
  openApi3CloudFunctions: {
    Config: OpenApi3CloudFunctionsConfig
  }
};
