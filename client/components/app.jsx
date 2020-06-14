import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: {
        name: 'checkout',
        params: {}
      },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
  }

  componentDidMount() {
    this.getCartItems();
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState(prevState => {
        return { ...prevState, message: data.message || data.error };
      }))
      .catch(err => this.setState(prevState => {
        return { ...prevState, message: err.message };
      }))
      .finally(() => this.setState(prevState => {
        return { ...prevState, isLoading: false };
      }));
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

  addToCart(product) {
    fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productId: product.productId })
    })
      .then(res => res.json())
      .then(data => this.setState(prevState => {
        prevState.cart.push(data);
        return { ...prevState, cart: prevState.cart };
      }))
      .catch(err => this.setState({ message: err.message }));
  }

  placeOrder(paymentInfo) {
    if (!paymentInfo || paymentInfo === null) {
      // eslint-disable-next-line no-console
      console.log('Cannot process the order because no payment information was supplied');
      return;
    }

    const { name, creditCard, shippingAddress } = paymentInfo;
    if (!name) {
      // eslint-disable-next-line no-console
      console.log('A name must be supplied to process the order');
      return;
    }
    if (!creditCard) {
      // eslint-disable-next-line no-console
      console.log('A credit card number must be supplied to process the order');
      return;
    }
    if (!shippingAddress) {
      // eslint-disable-next-line no-console
      console.log('A shipping address must be supplied to process the order');
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

    let body = null;
    switch (this.state.view.name) {
      case 'catalog': body = <ProductList setView={this.setView} />;
        break;
      case 'details': body = <ProductDetails
        setView={this.setView}
        productId={this.state.view.params.productId}
        addToCart={this.addToCart} />;
        break;
      case 'cart': body = <CartSummary
        cart={this.state.cart}
        setView={this.setView}/>;
        break;
      case 'checkout': body = <CheckoutForm
        setView={this.setView}
        placeOrder={this.placeOrder}/>;
        break;
    }
    return (
      <div className="container-fluid mx-0 px-0">
        <div className="row d-fled justify-content-center w-100 mx-0 px-0">
          <Header cartItemCount={this.state.cart.length} setView={this.setView}/>
          {body}
        </div>
      </div>
    );
  }
}
