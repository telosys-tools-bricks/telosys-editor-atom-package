'use babel';

import entityProvider from './entityProvider';
import vmProvider from './vmProvider';
import {CompositeDisposable} from 'atom';

export default {

  config: {
    "terminal": {
      "description": "If you do not use a classic terminal, enter it here.",
      "type": "string",
      "default": "xterm"
    },
    "terminalExecuteCommand": {
      "description": "If you do not use a classic terminal, enter it here.",
      "type": "string",
      "default": "-e"
    }
  },

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

    let childProcess = require('child_process');
    let os = require('os');
    let osname = os.type();

    let options = {
      detached : true,
      shell : true
    }
    if (osname == 'Windows_NT') {
      childProcess.spawn('tt', ['-h', projectDirectory], options);
    }
    else if (osname == 'Darwin') {
      const {
          exec
      } = require('child_process');

      const commands = [
          `osascript -e 'tell app "Terminal" to activate'`,
          `osascript -e 'tell app "Terminal"
              do script "tt -h ${projectDirectory}"
          end tell'`
      ];

      for (const command of commands) {
          exec(command, (error, stdout, stderr) => {
              if (error) {
                  console.error(`exec error: ${error}`);
                  return;
              }
              console.log(`stdout: ${stdout}`);
              console.log(`stderr: ${stderr}`);
          })
      }
    } else {
      let spawnTerminal;
      let configTerminal = atom.config.get('telosys.terminal');
      let terminalExecuteCommand = atom.config.get('telosys.terminalExecuteCommand');

      if (configTerminal === "xterm"){
        childProcess.spawn(spawnTerminal, [terminalExecuteCommand, '"tt" -h '+projectDirectory], {});
      }
      else {
        let terminal = childProcess.spawn('cat', ['/etc/alternatives/x-terminal-emulator', '|', 'grep', 'exe'], {});
        terminal.stdout.setEncoding('utf8').on('data', function(data) {

          if (data.includes('xterm')) spawnTerminal = 'xterm';
          else if (data.includes('uxterm')) spawnTerminal = 'uxterm';
          else if (data.includes('koi8rxterm')) spawnTerminal = 'koi8rxterm';
          else if (data.includes('lxterm')) spawnTerminal = 'lxterm';
          else if (data.includes('gnome-terminal')) spawnTerminal = 'gnome-terminal';
          else if (data.includes('konsole')) spawnTerminal = 'konsole';
          else if (data.includes('xfce4-terminal')) spawnTerminal = 'xfce4-terminal';
          else spawnTerminal = configTerminal;
          atom.config.set('telosys.terminal', spawnTerminal);

          childProcess.spawn(spawnTerminal, [terminalExecuteCommand, '"tt" -h '+projectDirectory], {});
        })
      }

    }
  }
};
