<img align="right" src="https://raw.github.com/cliffano/convo-node/main/avatar.jpg" alt="Avatar"/>

[![Build Status](https://github.com/cliffano/convo-node/workflows/CI/badge.svg)](https://github.com/cliffano/convo-node/actions?query=workflow%3ACI)
[![Dependencies Status](https://img.shields.io/librariesio/release/npm/convo-node)](https://libraries.io/npm/convo-node)
[![Code Scanning Status](https://github.com/cliffano/convo-node/workflows/CodeQL/badge.svg)](https://github.com/cliffano/convo-node/actions?query=workflow%3ACodeQL)
[![Coverage Status](https://img.shields.io/coveralls/cliffano/convo-node.svg)](https://coveralls.io/r/cliffano/convo-node?branch=master)
[![Security Status](https://snyk.io/test/github/cliffano/convo-node/badge.svg)](https://snyk.io/test/github/cliffano/convo-node)
[![Published Version](https://img.shields.io/npm/v/convo-node.svg)](https://www.npmjs.com/package/convo-node)
<br/>

convo-node
----------

convo-node is a tiny node.js helper lib to simplify running MCP server via a CLI and to register MCP tools on the server.

Installation
------------

    npm install convo-node

or as a dependency in package.json file:

    "dependencies": {
      "convo-node": "x.y.z"
    }

Usage
-----

Create tools:

    import { z } from 'zod';

    const tool1 = {
        info: {
            name: 'tool_1',
            description: 'MCP Tool 1',
            parameters: { name: z.string() }
        },
        handler: function(opts, actionCb) {
            return async({ arg1 }) => {
              function _contentText(result) {
                return `Tool1 ${arg1} has been handled`;
              }
              return new Promise((resolve, reject) => {
                const cb = actionCb(resolve, reject, _contentText);
                console.log(`Param 1 is ${opts.param1}`);
                cb();
              });
            };
        }
    };

    const tool2 = ...

Create application directory which is the location of the node.js module file which uses convo-node:

    import p from 'path';

    const appDir = p.dirname(import.meta.url).replace('file://', '');


Create options callback function which accepts CLI arguments and returns the options object:

    function optsCb(args) {

      // opts must contain tools property which is an array of MCP tools
      // and any other property that could be needed by the tools
      const opts = {
        param1: 'value1',
        tools: [
          tool1,
          tool2
        ]
      };

      return opts;

    }

Execute Convo:

    convo.exec(appDir, optsCb)();

Colophon
--------

[Developer's Guide](https://cliffano.github.io/developers_guide.html#nodejs)

Build reports:

* [Code complexity report](https://cliffano.github.io/convo-node/complexity/plato/index.html)
* [Unit tests report](https://cliffano.github.io/convo-node/test/mocha.txt)
* [Test coverage report](https://cliffano.github.io/convo-node/coverage/c8/index.html)
* [Integration tests report](https://cliffano.github.io/convo-node/test-integration/cmdt.txt)
* [API Documentation](https://cliffano.github.io/convo-node/doc/jsdoc/index.html)


Related Projects:

* [Convo](http://github.com/cliffano/convo) - Specification based voice and text conversation app
* [Convo Generator](http://github.com/cliffano/convo-generator) - Convo agent and middleware generator
