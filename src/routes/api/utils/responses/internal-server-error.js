module.exports = (res) => {
  res.status(500)
  res.json({
    error: "Internal server error."
  });
};
