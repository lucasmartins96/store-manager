const handleErrors = (err, _req, res, _next) => {
  const statusByErrorCode = {
    STOCK_PROBLEM: 404,
    NOT_FOUND: 404,
    INVALID_DATA: 422,
  };

  const status = statusByErrorCode[err.code] || 500;
  const code = err.code.toLowerCase();

  res.status(status).json({ err: { code, message: err.message } });
};

module.exports = {
  handleErrors,
};
