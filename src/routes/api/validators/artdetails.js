const invalidReq = require('../utils/responses/invalid-req');

/*
  Express middleware that validtes art details such
  as title, description, etc. being uploaded to the server.
*/

module.exports = (req, res, next) => {
  let jsonData = req.body;
  let valid = true;

  if (!jsonData) {
    valid = false;
  }

  if (valid) {
    next();
  } else {
    invalidReq(res);
  }
};
