import express from 'express';
import {join} from 'path';
import minimist from 'minimist';

var argv = minimist(process.argv.slice(2))
  , app    = express()
  , port   = argv.port || 1337
  , dir    = process.cwd()
  , indexFile = argv.index || 'index.html'
  , options = {
      dotfiles: 'ignore'
    , etag: false
    , extensions: ['html']
    , index: indexFile
    , maxAge: '1w'
    , redirect: false
    , setHeaders: (res, path, stat) => {
        res.set('x-timestamp', Date.now())
      }
    }
;

console.log(`running server with port: ${argv.p} and dir: ${argv.dir}`);

if ( argv.dir && typeof argv.dir === 'string' ) {
  if ( argv.dir.indexOf('/') === 0 ) {
    dir = argv.dir;
  } else {
    dir = join( process.cwd(), argv.dir );
  }
}

app.use(express.static(dir, options));

app.get('/kill', (req, res, next) => {
  console.log(`killing app at port ${port}`);
  process.exit();
});

app.listen(port);

console.log(
`
Screeninvader dev server listening to port: ${port}
and serving static files from ${dir}
`
);
