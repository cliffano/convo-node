const Sync = require('sync');

function handleRequest(request, response, callback) {
  console.log('Handling incoming DialogFlow request with method: ' + request.method + ' ... ');

  if (request.method === 'POST') {
    function asyncWrapper(done) {
      callback(done);
    }

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
