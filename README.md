# shttp
a simple http server
```bash
  npm install -g shttp
  shttp
  #now the dir you ran the command in gets served as static files
  xdg-open http://localhost:1337
```

```bash
  command line arguments:
  -p 1337            #the port to serve on
  --dir=dir          #a relative directory to use as root
  --dir=/path/do/dir #an absolute directory to use as root
  --single           #only serves index.html, always redirects to /
```
