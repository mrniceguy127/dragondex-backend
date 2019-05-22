module.exports = (res) => {
  res.status(401)
  res.json({
    error: "Unauthorized."
  });
};
