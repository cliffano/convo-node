"use strict";
/* eslint no-unused-vars: 0 */
import bag from 'bagofcli';
import cli from '../lib/cli.js';
import Convo from '../lib/convo.js';
import fs from 'fs';
import referee from '@sinonjs/referee';
import sinon from 'sinon';
const assert = referee.assert;

describe('cli - exec', function() {

  beforeEach(function () {
    this.mockBag = sinon.mock(bag);
    this.mockFs = sinon.mock(fs);
  });

  afterEach(function () {
    this.mockBag.verify();
    this.mockFs.verify();
    this.mockBag.restore();
    this.mockFs.restore();
  });

  it('should contain commands with actions', function (done) {
    this.mockBag.expects('logStepHeading').withExactArgs('Initialising MCP server some-app 1.2.3');
    this.mockBag.expects('logStepHeading').withExactArgs('Running Convo MCP server some-app 1.2.3');
    const appDir = 'path/to/app';
    const tools = [];
    const toolOptsCb = (args) => {
        return {};
    };

    this.mockFs.expects('readFileSync').withArgs('path/to/package.json').returns(JSON.stringify({
      name: 'some-app',
      version: '1.2.3'
    }));
    sinon.stub(Convo.prototype, 'run').value(function () {
      done();
    });
    sinon.stub(bag, 'command').value(function (base, actions) {
      assert.isString(base);
      assert.isFunction(actions.commands.run.action);
      actions.commands.run.action({ arg1: 'value1' });
    });
    cli.exec(appDir, tools, toolOptsCb)();
  });
});
