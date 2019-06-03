const Sequelize = require('sequelize');
const rp = require('request-promise');

const sql = new Sequelize('shopping_cart', null, null, {
  dialect: 'sqlite',
  typeValidation: true,
});

const schemaSettings = {
  timestamps: false,
  underscored: true,
  paranoid: true,
};

// Product model
const Product = sql.define(
  'product',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
    },
    thumbnail_url: Sequelize.STRING,
    title: Sequelize.STRING,
    description: Sequelize.STRING,
    cost: Sequelize.NUMERIC,
    rating: Sequelize.NUMERIC,
  },
  schemaSettings
);

const Cart = sql.define(
  'cart',
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    quantity: Sequelize.NUMERIC,
  },
  schemaSettings
);

// Seed products table with mock data
exports.init = () =>
  sql.sync({ force: true }).then(() => {
    const options = {
      uri: 'https://jsonplaceholder.typicode.com/photos',
      json: true,
    };
    rp(options)
      .then(json => {
        const data = json
          .map(({ title, thumbnailUrl }) => ({
            title: title.split(' ')[0],
            description: title,
            thumbnail_url: thumbnailUrl,
            cost: parseFloat((Math.random() * 250).toFixed()),
            rating: Math.floor(Math.random() * 6),
          }))
          .slice(0, 100);
        Product.bulkCreate(data);
      })
      .catch(err => err);
  });

exports.Product = Product;
exports.Cart = Cart;
