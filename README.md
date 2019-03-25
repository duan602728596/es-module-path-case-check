# es-module-path-case-check

Under the window, the path of the file will be case-insensitive, *es-module-path-case-check* is a detection tool that checks if the case of js does not match when the module is imported.   

Currently only support for checking es6 modules.

## How to use

`case-check --dir="./path/to/dir"`

## Cli command

* dir: Checked folder.
* ext: Finded file. If you introduce a css file as a module, you need to run the command like this: `case-check --dir="./path/to/dir" --ext="js,jsx,css"`.