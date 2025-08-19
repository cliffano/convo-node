"use strict";
import bag from 'bagofcli';
import fs from 'fs';
import Convo from './convo.js';
import p from 'path';

function exec(appDir, optsCb) {

  function _run(args) {

    const pkgFile = p.join(appDir, '..', 'package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgFile));

    const convoOpts = optsCb(args);

    const convo = new Convo(pkg.name, pkg.version, convoOpts);
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