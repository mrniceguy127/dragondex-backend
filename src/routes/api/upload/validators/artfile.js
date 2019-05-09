module.exports = (req, file, cb) => {
  const validMimeTypes = [ // Valid file types
    'image/png',
    'image/jpg'
  ];

  if (file) { // Check for valid form data
    let valid = true;

    if (valid && !validMimeTypes.includes(file.mimetype)) { // Validate file type
      valid = false;
    }

    if (valid) {
      cb(null, true);
    } else {
      cb(new Error('Bad request data.'));
    }
  } else {
    cb(new Error('Bad request data.'));
  }
};
