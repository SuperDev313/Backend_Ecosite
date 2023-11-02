const stripe = require('stripe')('pk_test_51O5J9XDPK7woGdAhQ2Rt0c6e8dGr1sEa5txba301ActpICDsAaHtlTA0AeuwFBdNxEAfrXm67Rw4qyU2Bo8dAjg000pkUSIdbK');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  res.send({
    status: session.status,
    customer_email: session.customer_details.email
  });
});

module.exports = router;
