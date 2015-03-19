"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var express = _interopRequire(require("express"));

var join = require("path").join;

var minimist = _interopRequire(require("minimist"));

var argv = minimist(process.argv.slice(2)),
    app = express(),
    port = argv.port || 1337,
    dir = process.cwd(),
    indexFile = argv.index || "index.html",
    options = {
  dotfiles: "ignore",
  etag: false,
  extensions: ["html"],
  index: indexFile,
  maxAge: "1w",
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set("x-timestamp", Date.now());
  }
};

console.log("running server with port: " + argv.p + " and dir: " + argv.dir);

if (argv.dir && typeof argv.dir === "string") {
  if (argv.dir.indexOf("/") === 0) {
    dir = argv.dir;
  } else {
    dir = join(process.cwd(), argv.dir);
  }
}

app.use(express["static"](dir, options));

app.get("/kill", function (req, res, next) {
  console.log("killing app at port " + port);
  process.exit();
});

app.listen(port);

console.log("\nScreeninvader dev server listening to port: " + port + "\nand serving static files from " + dir + "\n");

//# sourceMappingURL=shttp.js.map