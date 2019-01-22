const assert = require('assert');
const dialogFlowHttp = require('../../../lib/agents/dialogflow/http');
const sinon = require('sinon');

describe('DialogFlow Agent HTTP', function() {
  describe('handleRequest', function() {
    // beforeEach(function() {
    //   this.mockRequest = { method: 'GET' };
    //   this.mockConsole = sinon.mock(console);
    //   this.mockResponse = sinon.mock({
    //     status: function (code) {
    //       return {
    //         send: function (message) {
    //         }
    //       };
    //     }
    //   });
    // });
    // afterEach(function() {
    //   this.mockConsole.verify();
    //   this.mockResponse.verify();
    // });
    // it('should respond with status 405 when request method is unsupported', function(done) {
    //   // this.mockConsole.expects('log').once().withArgs('Handling incoming DialogFlow request with method: GET ...');
    //   this.mockResponse.expects('status').once().withArgs().returns(405);
    //   dialogFlowHttp.handleRequest(this.mockRequest, this.mockResponse, done);
    // });
    // it('should respond with status 200 when request method is supported', function() {
    //
    // });
  });
});
