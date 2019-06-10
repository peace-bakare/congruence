exports.sendSuccess = function sendSuccess(res, status, data) {
  res.status(status)
    .json({
      status: status,
      data: data || null
    });
};

exports.createError = function createError(status, code, errors) {
  const error = new Error();
  error.code = code;
  error.status = status;
  error.errors = typeof errors == 'string' ? [errors] : errors;
  return error;
};
