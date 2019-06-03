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
  Product.findAll()
    .then(products => res.json(transformData(products)))
    .catch(error => res.send(error));
});

// Cart API
// GET all cart items
app.get('/api/cart', (req, res) => {
  Cart.findAll()
    .then(items => res.json(items))
    .catch(error => res.send(error));
});

// Add new item to cart
app.post('/api/cart', (req, res) => {
  const { id, quantity = 1 } = req.body;
  Cart.create({ id, quantity })
    .then(item => res.json(item))
    .catch(error => res.send(error));
});

// Update item quantity by id
app.put('/api/cart', (req, res) => {
  const { id, quantity } = req.body;
  Cart.findByPk(id)
    .then(item => {
      item.update({ quantity }).then(() => {
        Cart.findAll().then(items => res.json(items));
      });
    })
    .catch(error => res.send(error));
});

init().then(() => {
  app.listen(4000, () => {
    console.log('server running on port 4000!');
  });
});

module.exports = app;
