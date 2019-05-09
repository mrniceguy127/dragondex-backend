const fs = require('fs');
const path = require('path');
const Route = require('../routes/route.js');
const express = require('express');

class Server {
  constructor(port, root = '/', routesDir = '.') {
    this.port = port;
    this.root = root;
    this.routesDir = path.resolve(routesDir);
    this.routes = [];

    this.app = express();
    this.server;
  }

  // Returns sub directories in a directory.
  getSubDirs(dir) {
    let subDirs = fs.readdirSync(dir).filter(subDir => {
      let absSubDir = path.resolve(path.join(dir, subDir));
      return fs.lstatSync(absSubDir).isDirectory()
    });
    return subDirs;
  }

  // Returns routes in a specific directory.
  getRouteFilesInDir(dir) {
    let absDir = path.resolve(dir);
    const subDirs = this.getSubDirs(absDir);
    const files = fs.readdirSync(absDir).filter(file => {
      let absFile = path.resolve(path.join(absDir, file));
      return fs.lstatSync(absFile).isFile() && file.endsWith('.js')
    }).map(file => './' + path.relative(__dirname, path.join(dir, file)));

    let routes = [];
    let i;

    for (i = 0; i < files.length; i++) {
      let exportedObject = require(files[i]);
      if (exportedObject.prototype instanceof Route) {
        routes.push(exportedObject);
      }
    }

    for (i = 0; i < subDirs.length; i++) {
      routes = routes.concat(this.getRouteFilesInDir(path.join(absDir, subDirs[i])));
    }

    return routes;
  }

  // Get all routes from the base routes directory.
  getRoutes() {
    return this.getRouteFilesInDir(this.routesDir).map(routeClass => new routeClass(this.app));
  }

  registerRoutes() {
    this.routes = this.getRoutes();
  }

  listenToRoutes() {
    let i;
    for (i = 0; i < this.routes.length; i++) {
      this.routes[i].listen();
    }
  }

  listenToHTTPServer(successMsg) {
    return new Promise((resolve, reject) => {
      this.server = this.app.listen(this.port, () => {
        console.log(successMsg)
        resolve();
      });
    });
  }

  listen(successMsg = "") {
    return new Promise((resolve, reject) => {
      this.listenToRoutes();
      this.listenToHTTPServer(successMsg)
      .then(() => {
        resolve();
      });
    });
  }
};

module.exports = Server;
