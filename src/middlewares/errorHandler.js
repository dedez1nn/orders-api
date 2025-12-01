module.exports = (err, req, res, next) => {
  console.error("Erro:", err);

  return res.status(err.status || 500).json({
    error: true,
    message: err.message || "Internal server error"
  });
};