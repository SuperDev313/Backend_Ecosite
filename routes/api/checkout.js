const stripe = require('stripe')('sk_test_wU7nrJCZspk1NPDxiQgAF05q');
const express = require('express');
const router = express.Router();
const YOUR_DOMAIN = 'http://localhost:3000';

router.post('/', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 'price_1O5ScWDPK7woGdAhHKZbXqw6',
        quantity: 1,
      },
    ],
    mode: 'payment',
    return_url: `${YOUR_DOMAIN}/return?session_id={CHECKOUT_SESSION_ID}`,
  });

  res.send({clientSecret: session.client_secret});
});

// router.get('/', async (req, res) => {
//   const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

//   res.send({
//     status: session.status,
//     customer_email: session.customer_details.email
//   });
// });

module.exports = router;
