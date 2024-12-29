function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || 'Erreur interne du serveur';

  console.error(`[Erreur] Statut : ${status}, Message : ${message}`);
  res.status(status).json({
    error: {
      status,
      message,
    },
  });
}

module.exports = { errorHandler };
