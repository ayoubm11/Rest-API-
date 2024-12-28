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
// Exemple : Erreur (500)
router.get('/server-error', (req, res, next) => {
  const err = new Error('Erreur interne du serveur.');
  err.status = 500;
  next(err);
});
//documenter les erreurs possibles
router.get('/errors', (req, res) => {
  res.json({
    errors: {
      400: 'Requête invalide (Bad Request)',
      404: 'Ressource non trouvée (Not Found)',
      500: 'Erreur interne du serveur (Internal Server Error)',
    },
  });
});

//validation des données avec Joi
const Joi = require('joi');

router.post('/validate', (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    const err = new Error(error.details[0].message);
    err.status = 400;
    return next(err);
  }

  res.status(201).json({ message: 'Validation réussie.' });
});



module.exports = router;
