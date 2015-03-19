#!/usr/bin/env node

import {createServer} from 'http';
import ecstatic from 'ecstatic';
import {join} from 'path';
import minimist from 'minimist';

var argv = minimist(process.argv.slice(2))
  , port   = argv.p || 1337
  , dir    = process.cwd()
;

console.log(`running server with port: ${argv.p} and dir: ${argv.dir}`);

if ( argv.dir && typeof argv.dir === 'string' ) {
  if ( argv.dir.indexOf('/') === 0 ) {
    dir = argv.dir;
  } else {
    dir = join( process.cwd(), argv.dir );
  }
}

if ( argv.k || argv.kill ) {
  process.exit();
}

createServer(
  ecstatic({
      root   : dir
    , showDir: false
    , autoIndex: true
    , defaultExt: 'html'
  })
).listen(port);

console.log(
`
Screeninvader dev server listening to port: ${port}
and serving static files from ${dir}
`
);
