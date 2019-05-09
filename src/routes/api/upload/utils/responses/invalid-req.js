module.exports = (res) => {
  res.status(400)
  res.json({
    error: "Invalid request data."
  });
};
