import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

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

  render() {
    const body = this.state.view.name === 'catalog'
      ? <ProductList setView={this.setView}/>
      : <ProductDetails
        setView={this.setView}
        productId={this.state.view.params.productId}
        addToCart={this.addToCart}/>;
    return (
      <div className="container-fluid mx-0 px-0">
        <div className="row d-fled justify-content-center w-100 mx-0 px-0">
          <Header cartItemCount={this.state.cart.length}/>
          {body}
        </div>
      </div>
    );
  }
}
