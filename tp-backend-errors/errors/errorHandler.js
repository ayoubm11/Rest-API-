function errorHandler(err, req, res, next) {
    const statusCode = err.status || 500;
    res.status(statusCode).json({
      error: {
        code: statusCode,
        message: err.message || 'Erreur interne du serveur',
      },
    });
  }
  
  module.exports = { errorHandler };
  