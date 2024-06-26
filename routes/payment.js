const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = Stripe('votre_clé_stripe_secrète');

router.post('/create-checkout-session', async (req, res) => {
  if (!req.session.user) {
    return res.status(401).send('Vous devez être connecté pour passer une commande');
  }

  const { cart } = req.body;

  const lineItems = cart.map(item => ({
    price_data: {
      currency: 'eur',
      product_data: {
        name: item.name,
      },
      unit_amount: item.price * 100,
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/cancel',
  });

  res.json({ id: session.id });
});

router.get('/success', (req, res) => {
  res.render('success');
});

router.get('/cancel', (req, res) => {
  res.render('cancel');
});

module.exports = router;
