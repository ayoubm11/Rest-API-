const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');

const app = express();

// Middleware pour analyser les requêtes JSON
app.use(bodyParser.json());

// Routes de l'API
app.use('/api', apiRoutes);

// Middleware de gestion des erreurs
const { errorHandler } = require('./errors/errorHandler');
app.use(errorHandler);

// Démarrage du serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
