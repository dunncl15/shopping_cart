import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Product from './components/Product/Product';
import Cart from './components/Cart/Cart';
import './index.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {
      products: {},
      product_ids: [],
      cart_products: [],
      showCart: false,
    };
    this.addItemToCart = this.addItemToCart.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
    this.handleCartData = this.handleCartData.bind(this);
    this.toggleCart = this.toggleCart.bind(this);
  }

  componentDidMount() {
    this.getAllProducts();
  }

  getAllProducts() {
    fetch('http://localhost:4000/api/products')
      .then(res => res.json())
      .then(({ data, ids }) =>
        this.setState({ products: data, product_ids: ids }, () => {
          this.getCartProducts(data);
        })
      );
  }

  getCartProducts(products) {
    fetch('http://localhost:4000/api/cart')
      .then(res => res.json())
      .then(items => this.handleCartData(items));
  }

  addItemToCart(id) {
    const { products } = this.state;
    fetch('http://localhost:4000/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })
      .then(res => res.json())
      .then(({ id, quantity }) => {
        const item = { ...products[id], quantity };
        this.setState(({ cart_products }) => ({
          cart_products: cart_products.concat(item),
        }));
      });
  }

  updateQuantity({ id, quantity }) {
    fetch('http://localhost:4000/api/cart', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, quantity }),
    })
      .then(res => res.json())
      .then(items => this.handleCartData(items));
  }

  handleCartData(items) {
    const { products } = this.state;
    items = items.map(obj => ({ ...obj, ...products[obj.id] }));
    this.setState(() => ({ cart_products: items }));
  }

  toggleCart() {
    this.setState(({ showCart }) => ({ showCart: !showCart }));
  }

  getCartItemCount() {
    return this.state.cart_products.reduce((acc, { quantity }) => {
      acc += quantity;
      return acc;
    }, 0);
  }

  renderProducts() {
    const { product_ids, products, cart_products } = this.state;
    return product_ids.map(id => {
      const inCart = cart_products.find(item => item.id === id);
      return (
        <Product
          key={id}
          handleClick={this.addItemToCart}
          inCart={Boolean(inCart)}
          {...products[id]}
        />
      );
    });
  }

  render() {
    const { showCart, cart_products } = this.state;
    return (
      <React.Fragment>
        <header>
          <button onClick={this.toggleCart}>
            <i className="fas fa-shopping-cart" />
            <span>{this.getCartItemCount()}</span>
          </button>
        </header>
        {showCart && (
          <Cart products={cart_products} updateQuantity={this.updateQuantity} />
        )}
        <main>{this.renderProducts()}</main>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
