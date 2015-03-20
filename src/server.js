#!/usr/bin/env node

import express from 'express';
import {join} from 'path';
import minimist from 'minimist';
import {info, log} from 'winston';
import morgan from 'morgan';

var server = express()
  , argv   = minimist(process.argv.slice(2))
  , port   = argv.p || 1337
  , dir    = process.cwd()
;

info(`running server with arguments: ${JSON.stringify(argv)`);

if ( argv.dir && typeof argv.dir === 'string' ) {
  if ( argv.dir.indexOf('/') === 0 ) {
    dir = argv.dir;
  } else {
    dir = join( process.cwd(), argv.dir );
  }
}

server.use(morgan('combined'));

if ( argv.single ) {
  server.use( (req, res, next) => {
    if ( req.path !== '/' ) {
      log(`path requested: ${req.path}. redirected to root`);
      return res.redirect('/');
    }
    res.status(200).sendFile(join(dir, 'index.html'));
  });
} else {
  server.use(express.static(dir, {
      extensions: ['html']
    , index: 'index.html'
    , maxAge: '1d'
    , redirect: false
    , setHeaders: (res) => {
        res.set('x-timestamp', Date.now())
      }
  }) );
}

server.use('/killkillkill', () => {
  console.log('app received kill command');
  process.exit();
});

server.use( (req, res, next) => {
  log('404');
  next();
});

server.listen(port);

console.log(
`
Screeninvader dev server listening to port: ${port}
and serving static files from ${dir}
`
);
