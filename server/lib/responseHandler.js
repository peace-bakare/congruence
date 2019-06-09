exports.sendSuccess = function sendSuccess(res, status, data) {
  res.status(status)
    .data({
      status: status,
      data: data
    });
};

exports.sendError = function sendError(res, status, error) {
  if (!(error instanceof Error))
    error = new Error(error);
  
  res.status(status)
    .data({
      status: status,
      error: error
    });
};

