// Base route class.

const path = require('path');

class Route {
  constructor(app) {
    this.app = app;
    this.base = '/'; // The base path
    this.path = '/'; // The path following the base
    this.type = "GET" // HTTP endpoint type.
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

  // Listen as a GET endpoint.
  get() {
    this.app.get(this.getFullPath(), ...this.middleList(), this.middle, this.action);
  }

  // Listen as a POST endpoint.
  post() {
    this.app.post(this.getFullPath(), this.middle, this.action);
  }

  put() {
    this.app.put(this.getFullPath(), this.middle, this.action);
  }

  delete() {
    this.app.delete(this.getFullPath(), this.middle, this.action);
  }

  listen() {
    let type = this.type.toUpperCase();
    if (type == "GET") this.get();
    else if (type == "POST") this.post();
    else if (type == "PUT") this.put();
    else this.delete();
  }

  // What to do when a request is made.
  async action(req, res, next) {
    res.json({ error: "No action set on this route." });
  }
}

module.exports = Route;
