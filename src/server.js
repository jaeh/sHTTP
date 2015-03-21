#!/usr/bin/env node

import express from 'express';
import {join} from 'path';
import minimist from 'minimist';
import {info, log} from 'winston';
import morgan from 'morgan';
import favicon from 'serve-favicon';
import {existsSync} from 'fs';

var app     = express()
  , argv    = minimist(process.argv.slice(2))
  , port    = argv.p || 1337
  , dir     = process.cwd()
  , favPath = join(dir, 'favicon.ico')
;

info(`running app with arguments: ${JSON.stringify(argv)}`);

if ( argv.dir && typeof argv.dir === 'string' ) {
  if ( argv.dir.indexOf('/') === 0 ) {
    dir = argv.dir;
  } else {
    dir = join( process.cwd(), argv.dir );
  }
}

//fs.existsSync only gets called once on first request
if ( ! app.enabled('faviconChecked') && ! app.get('faviconExists') ) {
  app.enable('faviconChecked');
  app.set('faviconExists', existsSync(favPath));
}
//this will get executed every request if the favicon exists
if ( app.enabled('faviconExists') ) {
  console.log('serve favicon');
  app.use( favicon(favPath) );
}

app.use(morgan('combined'));

//serve all static files
app.use(express.static(dir, {
    extensions: ['html']
  , index: 'index.html'
  , maxAge: '1d'
  , redirect: false
  , setHeaders: (res) => {
      res.set('x-timestamp', Date.now())
    }
}) );
//kill the server when requested
app.use('/killkillkill', () => {
  console.log('app received kill command');
  process.exit();
});
//redirect to / if we are in single page mode, no 404 pages needed
if ( argv.single ) {
  app.use( (req, res, next) => {
    if ( req.path !== '/' ) {
      log(`path requested: ${req.path} redirected to root`);
      return res.redirect('/');
    }
    res.status(200).sendFile(join(dir, 'index.html'));
  });
}
//no files found, 404 error
app.use( (req, res, next) => {
  log('404');
  res.status(404).send('oops');
});

app.listen(port);

console.log(
`
Screeninvader dev app listening to port: ${port}
and serving static files from ${dir}
`
);
