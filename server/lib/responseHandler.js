exports.sendSuccess = function sendSuccess(res, status, data) {
  res.status(status)
    .json({
      status: status,
      data: data
    });
};

exports.sendError = function sendError(res, status, error) {
  if(typeof errors == "string")
    res.status(status)
      .json({
        status: status,
        error: error
      });
  else
    res.status(status)
      .json({
        status: status,
        errors: error
      })
};
