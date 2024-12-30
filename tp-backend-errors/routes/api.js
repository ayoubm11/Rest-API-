const express = require('express');
const router = express.Router();
const Joi = require('joi');

// Middleware global pour la gestion des erreurs
const errorHandler = (err, req, res, next) => {
  const status = err.status || 500; // Par défaut, on utilise le statut 500 (Erreur interne)
  res.status(status).json({
    error: {
      status,
      message: err.message || 'Erreur interne du serveur',
    },
  });
};

// === 1. ROUTES SPÉCIFIQUES AUX ERREURS CLIENT === //

// Erreur 400 : Requête invalide
router.post('/bad-request', (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    const err = new Error('Le champ "name" est requis.');
    err.status = 400;
    return next(err);
  }
  res.status(201).json({ message: 'Ressource créée avec succès.' });
});

// Erreur 401 : Non autorisé
router.get('/unauthorized', (req, res, next) => {
  const err = new Error('Non autorisé.');
  err.status = 401;
  next(err);
});

// Erreur 403 : Accès interdit
router.get('/forbidden', (req, res, next) => {
  const err = new Error('Accès interdit.');
  err.status = 403;
  next(err);
});

// Erreur 404 : Ressource non trouvée
router.get('/not-found', (req, res, next) => {
  const err = new Error('Ressource non trouvée.');
  err.status = 404;
  next(err);
});

// === 2. ROUTES POUR LES ERREURS SERVEUR === //

// Erreur 409 : Conflit
router.post('/conflict', (req, res, next) => {
  const { name } = req.body;
  if (name === 'existant') {
    const err = new Error('Le nom existe déjà.');
    err.status = 409;
    return next(err);
  }
  res.status(201).json({ message: 'Ressource créée avec succès.' });
});

// Erreur 422 : Données non valides
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

// Erreur 500 : Erreur interne du serveur
router.get('/internal-error', (req, res, next) => {
  const err = new Error('Erreur interne du serveur.');
  err.status = 500;
  next(err);
});

// === 3. VALIDATION DES DONNÉES AVEC JOI === //
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

// === 4. LISTE DES ERREURS DOCUMENTÉES === //
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

// === MIDDLEWARE DE GESTION DES ERREURS === //
router.use(errorHandler);

module.exports = router;
