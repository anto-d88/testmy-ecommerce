const express = require('express');
const router = express.Router();
const connection = require('../db');

router.get('/', (req, res) => {
   /* connection.query('SELECT * FROM products', (err, results) => {
        if (err) {
          return res.status(500).send('Erreur de requête SQL');
        }*/
        //res.render('accueil');
       // res.render('accueil', { user: req.session.user });
        res.render('accueil', { products: results, user: req.session.user });
      });
  //});
module.exports = router;