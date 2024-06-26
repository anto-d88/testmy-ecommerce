const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const connection = require('../db');
// Route pour passer une commande
router.post('/success', (req, res) => {
    if (!req.session.user) { 
      return res.status(401).send('Vous devez être connecté pour passer une commande');
    }
  
    const userId = req.session.user.id;
    const { cart } = req.body;
  
    // Calculer le total de la commande
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
    // Insérer la commande dans la table orders
    connection.query('INSERT INTO orders (user_id, total) VALUES (?, ?)', [userId, total], (err, result) => {
      if (err) {
        return res.status(500).send('Erreur de requête SQL');
      }
  
      const orderId = result.insertId;
  
      // Insérer les articles de la commande dans la table order_items
      const orderItems = cart.map(item => [orderId, item.id, item.quantity, item.price]);
      connection.query('INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?', [orderItems], (err, results) => {
        if (err) {
          return res.status(500).send('Erreur de requête SQL');
        }
        console.log('Commande passée avec succès')
        res.redirect('/success');
        
      });
    });
  });
  router.get('/success', (req, res) => {
    res.render('success');
  });
  
  router.get('/cancel', (req, res) => {
    res.render('cancel');
  });
  module.exports = router;