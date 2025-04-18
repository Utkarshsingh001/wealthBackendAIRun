export const responseHandlers = (req, res, next) => {
  res.success = (message, data = {}, statusCode = 200) => {
    res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  };

  res.error = (message, statusCode = 500, errors = []) => {
    res.status(statusCode).json({
      success: false,
      message,
      errors,
    });
  };

  next();
};

export const errorHandler = (err, req, res, next) => {
  console.error(err);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  const errors = err.errors || [];
  res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};
