const DialogFlow2Config = require('./agents/dialogflow2/config');
const dialogFlow2Http = require('./agents/dialogflow2/http');
const dialogFlow2Payload = require('./agents/dialogflow2/payload');
const OpenApi3CloudFunctionsConfig = require('./middlewares/openapi3-cloudfunctions/config');

module.exports = {
  dialogFlow2: {
    Config: DialogFlow2Config,
    http: dialogFlow2Http,
    payload: dialogFlow2Payload
  },
  openApi3CloudFunctions: {
    Config: OpenApi3CloudFunctionsConfig
  }
};
