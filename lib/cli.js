"use strict";
import bag from 'bagofcli';
import fs from 'fs';
import Convo from './convo.js';
import p from 'path';

/**
 * 
 * @param {String} appDir: application directory which is the location of the node.js module file which uses convo-node 
 *                         this directory should be on directory lower than where package.json is located
 * @param {Array} tools: array of MCP tools to be registered
 * @param {Function} toolOptsCb: callback function to create custom tool options
 * @returns {Function} exec function that runs command via bagofcli
 */
function exec(appDir, tools, toolOptsCb) {

  function _run(args) {

    const pkgFile = p.join(appDir, '..', 'package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgFile));

    const toolOpts = toolOptsCb(args);

    const convo = new Convo(pkg.name, pkg.version, tools, toolOpts);
    bag.logStepHeading(`Running Convo MCP server ${pkg.name} ${pkg.version}`);
    convo.run();

  }

  /**
   * Execute Convo CLI run command.
   */
  function _exec() {

    const actions = {
      commands: {
        run : { action: _run }
      }
    };

    bag.command(appDir, actions);
  }

  return _exec;

}

const exports = {
  exec: exec
};

export {
  exports as default
};