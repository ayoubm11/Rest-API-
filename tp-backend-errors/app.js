const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');
const { errorHandler } = require('./errors/errorHandler');

const app = express();

// Middleware pour analyser les requêtes JSON
app.use(bodyParser.json());

// Middleware pour les en-têtes CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Route de test (racine)
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur l\'API!' });
});

// Routes de l'API
app.use('/api', apiRoutes);

// Middleware de gestion des erreurs
app.use(errorHandler);

// Démarrage du serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
