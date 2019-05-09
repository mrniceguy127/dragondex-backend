// Base route class. Is abstract.

const path = require('path');

class Route {
  constructor(app) {
    // this.app = app;
    // this.base = '/'; // The base path
    // this.path = '/'; // The path following the base
    // this.type = "GET" // HTTP endpoint type.
    if (this.constructor === Route) {
      throw new Error("Cannot instantiate an abstract class!");
    } else {
      this.app = app;
    }
  }

  // Return full path of route
  getFullPath() {
    return path.join(this.base, this.path);
  }

  // Returns a list of middleware functions for the route. Use if using multiple middleware functions.
  middleList(req, res, next) {
    return [];
  }

  // Middleware for the route. Use if you are only adding one middleware function. Can be used with middleList, but is executed last.
  middle(req, res, next) {
    next();
  }

  // Listen to endpoint based on type.
  listen() {
    let type = this.type.toUpperCase();
    if (type == "GET") {
      this.app.get(this.getFullPath(), ...this.middleList(), this.middle, this.action);
    } else if (type == "POST") {
      this.app.post(this.getFullPath(), ...this.middleList(), this.middle, this.action);
    } else if (type == "PUT") {
      this.app.put(this.getFullPath(), ...this.middleList(), this.middle, this.action);
    } else {
      this.app.delete(this.getFullPath(), ...this.middleList(), this.middle, this.action);
    }
  }

  // What to do when a request is made.
  async action(req, res, next) {
    res.json({ error: "No action set on this route." });
  }
}

module.exports = Route;
