const handleErrors = (err, _req, res, _next) => {
  const statusByErrorCode = {
    badRequest: 400,
    notFound: 404,
    alreadyExists: 409,
    INVALID_DATA: 422,
  };

  const status = statusByErrorCode[err.code] || 500;

  res.status(status).json({ error: { message: err.message } });
};

module.exports = {
  handleErrors,
};
