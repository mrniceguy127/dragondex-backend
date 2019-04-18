const fs = require('fs');
const path = require('path');

class Server {
  constructor(routesDir = '.') {
    this.routesDir = path.resolve(routesDir);
  }

  // Returns sub directories in a directory.
  getSubDirs(dir) {
    return [];
  }

  // Returns routes in a specific directory.
  getRoutesInDir(dir) {
    let subDirs = this.getSubDirs(dir);
    // ... <-- resume here. get all routes in current directory, than recursively get all routes in sub directories.
  }

  // Get all routes from the base routes directory.
  getRoutes() {
    return this.getRoutesInDir(this.routesDir);
  }
};

module.exports = Server;
