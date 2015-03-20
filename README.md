# shttp
a simple http server
```bash
  npm install -g shttp
  shttp
  #now the dir you ran the server from gets served as static files
  xdg-open http://localhost:1337
```

###command line arguments
```bash
  -p 1337            #the port to serve on
  --dir=dir          #a relative directory to use as root
  --dir=/path/do/dir #an absolute directory to use as root
  --single           #only serves inlined index.html, redirects all requests to /
```

###usage examples
```bash
  #serve /srv/www/index.html on port 80, all css/js/images inlined
  shttp -p 80 --dir /srv/www/ --single
  #serve all files in current directory on port 80
  shttp -p 80 
  #serve all files in current directory's dist subdir on port 80
  shttp -p 80 --dir dist
```
