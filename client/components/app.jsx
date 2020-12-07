import React from 'react';
import Header from './header';
import ProductList from './product-list';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';
import DisclaimerModal from './disclaimer-modal';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: {
        name: 'catalog',
        params: {}
      },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
  }

  componentDidMount() {
    this.getCartItems();
  }

  setView(name, params) {
    this.setState(prevState => {
      return {
        ...prevState,
        view: {
          name: name,
          params: params
        }
      };
    });
  }

  getCartItems() {
    fetch('/api/cart')
      .then(res => res.json())
      .then(data => this.setState(prevState => {
        return { ...prevState, cart: data };
      }))
      .catch(err => this.setState({ message: err.message }));
  }

  addToCart(product, quantity) {
    const { cart } = this.state;
    const productIds = cart.map(product => {
      return product.productId;
    });

    if (productIds.includes(product.productId)) {
      const pIndex = productIds.indexOf(product.productId);
      this.updateQuantity(cart[pIndex].productId, quantity + cart[pIndex].quantity);
    } else {
      (
        fetch('/api/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ productId: product.productId, quantity: quantity })
        })
          .then(res => res.json())
          .then(data => this.setState(prevState => {
            prevState.cart.push(data);
            return { ...prevState, cart: prevState.cart };
          }))
          .catch(err => this.setState({ message: err.message }))
      );
    }
  }

  updateQuantity(productId, quantity) {
    if (quantity >= 1) {
      fetch('/api/cart/update-quantity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId: productId, quantity: quantity })
      })
        .then(res => res.json())
        .then(data => {
          const cart = this.state.cart;
          const productIds = cart.map(product => {
            return product.productId;
          });
          const indexToUpdate = productIds.indexOf(productId);
          cart[indexToUpdate] = { ...cart[indexToUpdate], quantity: quantity };
          this.setState({ cart: cart });
        })
        .catch(err => this.setState({ message: err.message }));
    } else {
      fetch('/api/cart/remove-item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId: productId })
      })
        .then(res => res.json())
        .then(data => {
          const cart = this.state.cart;
          const productIds = cart.map(product => {
            return product.productId;
          });
          const indexToUpdate = productIds.indexOf(productId);
          cart.splice(indexToUpdate, 1);
          this.setState({ cart: cart });
        })
        .catch(err => this.setState({ message: err.message }));
    }
  }

  placeOrder(paymentInfo) {
    if (!paymentInfo || paymentInfo === null) {
      return;
    }

    const { name, creditCard, shippingAddress } = paymentInfo;
    if (!name) {
      return;
    }

    if (!creditCard) {
      return;
    }

    if (!shippingAddress) {
      return;
    }

    fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(paymentInfo)
    })
      .then(res => res.json())
      .then(data => this.setState(prevState => {
        return {
          ...prevState,
          view: { name: 'catalog', params: {} },
          cart: []
        };
      }))
      .catch(err => this.setState({ message: err.message }));
  }

  render() {
    const itemCount = this.state.cart.reduce((itemCount, product) => {
      return itemCount + product.quantity;
    }, 0);
    let body = null;
    switch (this.state.view.name) {
      case 'disclaimer': body =
        <DisclaimerModal
          setView={this.setView}
        />;
        break;
      case 'catalog': body =
        <ProductList
          setView={this.setView}
          productId={this.state.view.params.productId}
          addToCart={this.addToCart}
        />;
        break;
      case 'cart': body =
        <CartSummary
          cart={this.state.cart}
          setView={this.setView}
          updateQuantity={this.updateQuantity}
        />;
        break;
      case 'checkout': body =
        <CheckoutForm
          setView={this.setView}
          placeOrder={this.placeOrder}
        />;
        break;
    }
    return (
      <div className="container-fluid mx-0 px-0">
        <div className="row m-0">
          <Header
            cartItemCount={itemCount}
            setView={this.setView}/>
        </div>
        <div className="row d-flex justify-content-center m-0 mt-4">
          {body}
        </div>
      </div>
    );
  }
}
