/*
  AWS configuration and AWS S3 settings.
*/

const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' });

let s3 = new AWS.S3({ apiVersion: "2012-10-17" });

module.exports = s3;
