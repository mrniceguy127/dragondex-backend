const invalidReq = require('../utils/responses/invalid-req');

module.exports = (req, res, next) => {
  let jsonData = req.body;
  let valid = true;

  if (!jsonData) {
    valid = false;
  }

  if (valid && !jsonData.postedBy) {
    valid = false;
  }

  if (valid) {
    next();
  } else {
    invalidReq(res);
  }
};
