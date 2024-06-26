const express = require('express');
const router = express.Router();
const connection = require('../db');

router.get('/produis', (req, res) => {
  connection.query('SELECT * FROM products', (err, results) => {
    if (err) {
      return res.status(500).send('Erreur de requête SQL');
    }
    res.render('produis', { products: results, user: req.session.user });
  });
});

router.get('/product/:id', (req, res) => {
  const productId = req.params.id;
  connection.query('SELECT * FROM products WHERE id = ?', [productId], (err, results) => {
    if (err) {
      return res.status(500).send('Erreur de requête SQL');
    }
    if (results.length === 0) {
      return res.status(404).send('Produit non trouvé');
    }
    res.json(results[0]);
  });
});

module.exports = router;
