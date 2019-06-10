exports.sendSuccess = function sendSuccess(res, status, data) {
  res.status(status)
    .json({
      status: status,
      data: data
    });
};

exports.sendError = function sendError(res, status, error) {
  if (!(error instanceof Error))
    error = new Error(error);
  
  res.status(status)
    .json({
      status: status,
      error: error
    });
};

