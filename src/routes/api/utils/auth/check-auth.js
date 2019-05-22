const unauthorized = require('../responses/unauthorized');

function checkAuth(req, res, next) {
  let isAuthed = req.isAuthenticated();

  if (isAuthed || process.env.USE_AUTH !== 'true') {
    next();
  } else {
    unauthorized(res);
  }
}

module.exports = checkAuth;
