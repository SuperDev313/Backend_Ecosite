const express = require('express');
const stripe = require('stripe')(
  'sk_test_51O5J9XDPK7woGdAh3mr0udDOW73kHfndac5N31Lqs9mgJKnPmEOW9CnfklIphfLezuu7NgkK3KkdL22FlE2oU9x900bcKppDOC'
);
const connectDB = require('./config/db');
const path = require('path');
const cors = require('cors');
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

const YOUR_DOMAIN = 'http://localhost:3000';

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 'price_1O5ScWDPK7woGdAhHKZbXqw6',
        quantity: 1
      }
    ],
    // redirect_on_completion: 'never', // when you don't need redirect;
    mode: 'payment',
    return_url: `${YOUR_DOMAIN}/return?session_id={CHECKOUT_SESSION_ID}` // need redirect
  });

  res.send({ clientSecret: session.client_secret });
});

app.get('/session-status', async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  res.send({
    status: session.status,
    customer_email: session.customer_details.email
  });
});

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/admin', require('./routes/api/admin'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/generateDiet', require('./routes/api/generateDiet'));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
