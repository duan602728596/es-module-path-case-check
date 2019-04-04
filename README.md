# es-module-path-case-check

Under the window, the path of the file will be case-insensitive, *es-module-path-case-check* is a detection tool that checks if the case of js does not match when the module is imported.   

Can check es6 modules like `import fn from './modules';`, `import('./modules');`.   

The file type that supports checking is `.js`, `.jsx`, `.json`, `.ts`, `.tsx`, `.vue`, `.mjs`, `.wasm`, `.node`.

## How to use

`case-check --dir="./path/to/dir"`

## Parsing css

> This feature will cause analysis failure due to grammar problems.

If you want to parse the url field of a css file, you can run the command like this: `case-check --dir="./path/to/dir" --css`.   

The file type that supports checking is `.vue`, `.css`, `.sass`, `.scss`, `.less`, `styl`, `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`, `.svg`, `.ttf`, `.woff`, `.woff2`, `.eot`.   

## Cli command

* dir: Checked folder.
* ext: Finded file. If you introduce a file as a module, you need to run the command like this: `case-check --dir="./path/to/dir" --ext="ext1,ext2"`.
* css: Allow parsing of style sheets and finding reference files in css. (For example: image and font files.)
