'use babel';

import entityProvider from './entityProvider';
import vmProvider from './vmProvider';
import {CompositeDisposable} from 'atom';

export default {
  // Init atom telosys subemnu under "Packages"
  activate(state) {
  this.subscriptions = new CompositeDisposable();
  this.subscriptions.add(atom.commands.add('atom-workspace', {
      'telosys:cli': () => this.openTelosysCLI()
    }));
  },
  getProvider() {
    // return a single provider, or an array of providers to use together
    return [entityProvider, vmProvider];

  },
  openTelosysCLI() {
    projectDirectory = atom.project.getPaths();

		var spawn = require('child_process').spawn;
    var os = require('os');
    var osname = os.type();

    var options = {
      detached : true,
			stdout : 'ignore',
			stderr : 'ignore',
			shell : false
    }
    if (osname == 'Windows_NT') {
      var proc = spawn('tt.bat', ['-h', projectDirectory], options);
    } else {
      var proc = spawn('tt', ['-h', projectDirectory], options);
    }
  }
};
