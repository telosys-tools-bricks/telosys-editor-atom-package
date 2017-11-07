# Telosys package for Atom editor

Telosys templates, DSL models and configuration files support for Atom.  

## Introduction

This package provides syntax coloration and auto-completion for :  
- Telosys DSL model ".entity" & ".model" files.  
- Telosys configuration files ".cfg".  
- Telosys template files ".cfg".  

## Installation

Use the Atom Package manager to install this package :

1 - In Atom, open the "File" menu and select "Settings".  
2 - In the settings, click on "Install".  
3 - Click on "Search packages" and type "language-dsl-telosys".  
4 - The package should appear below, just click on the blue "Install" button and you're done.  

**ADDITIONAL** : If you want to use Telosys-CLI from Atom :  
1 - Install Telosys-CLI by following the instructions at [the Telosys-CLI repo](https://github.com/telosys-tools-bricks/telosys-cli)  
2 - Install `atom-shell-commands` package in Atom  
3 - Add the following code to Atom's config.cson file (File > Config) :  
```
  "atom-shell-commands":
    commands: [
      {
        name: "telosys"
        command: "cmd"
        arguments: [
          "/C"
          "start"
          "tt"
	  "-h {ProjectDir}"
        ]
        options:
          cwd: "{ProjectDir}"
          keymap: 'ctrl-1'
      }
    ]
```  
4 - In Atom, type `atom-shell-commands:telosys` in the Atom command palette, or hit CTRL+1 to start Telosys-CLI right in your project's folder.

## License

This package uses the [LGPL v3 License](https://www.gnu.org/licenses/lgpl-3.0.en.html) (See the LICENSE file in this repository).  

## Thanks

- [Will Boyd](https://github.com/lonekorean) for its well described "[atom-autocomplete-boilerplate](https://github.com/lonekorean/atom-autocomplete-boilerplate)".  
- [skywind3000](https://github.com/skywind3000) for creating [Atom Shell Commands](https://atom.io/packages/atom-shell-commands).

## Credits

- Made by [Romuald Tuffreau](https://github.com/romwaldtff).
- [Laurent Guerin](https://github.com/l-gu) for [Telosys](http://telosys.org/) and [Telosys-CLI](https://github.com/telosys-tools-bricks/telosys-cli).
