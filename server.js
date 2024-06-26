const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const session = require('express-session');
const memorystore = require("memorystore")(session);
//const Stripe = require('stripe');
const app = express();
const PORT = process.env.PORT || 3306; 


// Configurer Stripe
//const stripe = Stripe('votre_clé_stripe_secrète');

// Configurer le dossier public pour les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Configurer le moteur de template
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Middleware pour parser les requêtes POST
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configurer les sessions
app.use(session({
  cookie: { maxAge: 86400000 },
    store: new memorystore({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
  secret: 'votre_secret',
  resave: false,
  saveUninitialized: false
}));

// Créer une connexion à la base de données MySQL
/*const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Toni-deb2012',
  database: 'ecommerce'
});*/

// Importer et utiliser les routes///
const authRoutes = require('./routes/auth');
const historyRoutes = require('./routes/historys');
const accueilRoutes = require('./routes/index');
//const productRoutes = require('./routes/product');
const commandeRoutes = require('./routes/commande');
//const paymentRoutes = require('./routes/payment');

app.use(authRoutes);
app.use(historyRoutes);
app.use(accueilRoutes);
//app.use(productRoutes);
app.use(commandeRoutes);
//app.use(paymentRoutes);

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
