const express = require('express');
const router = express.Router();

// Route exemple : Création d'une ressource
router.post('/resource', (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    // Générer une erreur de type "Bad Request"
    const err = new Error('Le champ "name" est requis.');
    err.status = 400;
    return next(err);
  }
  res.status(201).json({ message: 'Ressource créée avec succès.' });
});

// Exemple : Erreur non trouvée (404)
router.get('/nonexistent', (req, res, next) => {
  const err = new Error('Ressource non trouvée.');
  err.status = 404;
  next(err);
});

module.exports = router;
