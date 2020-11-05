const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

// pass secret key to the returned function and get an object that we can use to make stripe charge
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
// When you deploy to Heroku, it sets up the process PORT for you
const port = process.env.PORT || 5000;

app.use(compression());
// Process all body from coming requests and convert it to json format
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// cors: cross-origin resource sharing
// allow to pass requests from our frontend to our backend server
app.use(cors());

// __dirname is part of Node.js
// allow to serve static files from client/build folder
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  // this is for every urls that user hit
  // req: the actual request we're getting
  // res: the response we're going to send back
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.thml'));
  });
}

app.listen(port, (error) => {
  if (error) throw error;
  console.log(`Server running on port ${port}...`);
});

app.post('/payment', (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: 'usd',
  };

  // make stripe charge after we got request from out client side (frontend),
  // and send response back based on success or failure
  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  });
});
