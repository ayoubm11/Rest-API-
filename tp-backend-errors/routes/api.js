const express = require('express');
const router = express.Router();
const Joi = require('joi');

// Middleware de gestion des erreurs
router.use((err, req, res, next) => {
  const status = err.status || 500; // Par défaut, on utilise le statut 500 (Erreur interne)
  res.status(status).json({
    error: {
      status,
      message: err.message || 'Erreur interne du serveur',
    },
  });
});

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

// Exemple : Erreur interne du serveur (500)
router.get('  ', (req, res, next) => {
  const err = new Error('Erreur interne du serveur.');
  err.status = 500;
  next(err);
});

// Exemple : Liste des erreurs possibles
router.get('/errors', (req, res) => {
  res.json({
    errors: {
      400: 'Requête invalide (Bad Request)',
      401: 'Non autorisé (Unauthorized)',
      403: 'Accès interdit (Forbidden)',
      404: 'Ressource non trouvée (Not Found)',
      409: 'Conflit (Conflict)',
      422: 'Données non valides (Unprocessable Entity)',
      500: 'Erreur interne du serveur (Internal Server Error)',
    },
  });
});

// Validation des données avec Joi
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

// Gestion des erreurs spécifiques
// Exemple : Non autorisé (401)
router.get('/unauthorized', (req, res, next) => {
  const err = new Error('Non autorisé.');
  err.status = 401;
  next(err);
});

// Exemple : Accès interdit (403)
router.get('/forbidden', (req, res, next) => {
  const err = new Error('Accès interdit.');
  err.status = 403;
  next(err);
});

// Exemple : Conflit (409)
router.post('/conflict', (req, res, next) => {
  const { name } = req.body;
  if (name === 'existant') {
    const err = new Error('Le nom existe déjà.');
    err.status = 409;
    return next(err);
  }
  res.status(201).json({ message: 'Ressource créée avec succès.' });
});

// Exemple : Données non valides (422)
router.post('/unprocessable', (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    const err = new Error('Données non valides: ' + error.details[0].message);
    err.status = 422;
    return next(err);
  }

  res.status(201).json({ message: 'Données validées avec succès.' });
});

module.exports = router;
