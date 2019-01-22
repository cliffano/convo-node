const Sync = require('sync');

/**
 * DialogFlow agent HTTP request handler.
 * It syncs an async call due to Serverless Framework's Google CloudFunctions
 * being synchronous but the libraries required to process the payload are asynchronous.
 * https://serverless.com/framework/docs/providers/google/guide/functions#handler-signatures
 * DialogFlow webhook only sends POST HTTP method.
 *
 * @param {Object} request: Serverless HTTP request object
 * @param {Object} response: Serverless HTTP response object
 * @param {Object} cb: any callback function to be synced
 */
function handleRequest(request, response, cb) {
  console.log('Handling incoming DialogFlow request with method: ' + request.method + ' ... ');

  function asyncWrapper(done) {
    cb(done);
  }

  if (request.method === 'POST') {
    Sync(function() {
      const result = asyncWrapper.sync();
      response.status(200).send(result);
    });
  } else {
    response.status(405).send('Unsupported method: ' + request.method);
  }
}

module.exports = {
  handleRequest: handleRequest
};
