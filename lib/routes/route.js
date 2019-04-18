// Base route class.

const path = require('path');

class Route {
  constructor(app, base, path, type = "GET") {
    this.app = app;
    this.base = base; // The base path
    this.path = path; // The path following the base

    validTypes = [
      'get', 'post', 'put', 'delete'
    ];

    if (validTypes.includes(type.toLowerCase())) {
      this.type = type.toUpperCase(); // Endpoint type (e.g. GET, POST, etc).
    } else {
      throw new Error("Invalid HTTP endpoint type.");
    }
  }

  // Return full path of route
  getFullPath() {
    return path.join(this.base, this.path);
  }

  // Returns middleware for the route.
  middle() {
    return;
  }

  // Listen as a GET endpoint.
  get() {
    this.app.get(this.getFullPath(), this.middle, this.action);
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
    if (this.type == "GET") this.get();
    else if (this.type == "POST") this.post();
    else if (this.type == "PUT") this.put();
    else this.delete();
  }

  // What to do when a request is made.
  async action(req, res) {
    return;
  }
}

module.exports = Route;
