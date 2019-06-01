const express = require('express');
const cors = require('cors');
const { init, Product, Cart } = require('./db.js');
const { transformData } = require('./helpers/helpers');

const app = express();
const bodyParser = require('body-parser');

app.use(cors({ origin: 'http://localhost:8080' }));
app.use(bodyParser.json());

// Product API
// GET all products
app.get('/api/products', (req, res) => {
  Product.findAll().then(products => res.json(transformData(products)));
});

// Cart API
// GET all cart items
app.get('/api/cart', (req, res) => {
  Cart.findAll().then(items => res.json(transformData(items)));
});

// Add new item to cart
app.post('/api/cart', (req, res) => {
  const { id, quantity } = req.body;
  Cart.create({ id, quantity }).then(() => {
    Cart.findAll().then(items => res.json(transformData(items)));
  });
});

// Update item quantity by id
app.put('/api/cart', (req, res) => {
  const { id, quantity } = req.body;
  Cart.findByPk(id).then(item => {
    item.update({ quantity }).then(() => {
      Cart.findAll().then(items => res.json(transformData(items)));
    });
  });
});

init().then(() => {
  app.listen(4000, () => {
    console.log('server running on port 4000!');
  });
});

module.exports = app;
