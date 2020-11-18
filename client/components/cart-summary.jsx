import React from 'react';
import CartSummaryItems from './cart-summary-item';

export default class CartSummary extends React.Component {

  constructor(props) {
    super(props);
    this.handleCatalogClick = this.handleCatalogClick.bind(this);
    this.handleCheckoutClick = this.handleCheckoutClick.bind(this);
    this.consolidate = this.consolidate.bind(this);
  }

  componentDidMount() {
    this.setState({ quantity: this.props.quantity });
  }

  handleCatalogClick() {
    this.props.setView('catalog', {});
  }

  handleCheckoutClick() {
    this.props.setView('checkout', {});
  }

  updateQuantity(productId, quantity) {
    this.props.updateQuantity(productId, quantity);
  }

  consolidate(cart) {
    const seenItems = {};
    const output = [];
    const length = cart.length;
    let outputIndex = 0;
    for (let itemIndex = 0; itemIndex < length; itemIndex++) {
      const item = cart[itemIndex];
      if (seenItems[item.productId] !== 1) {
        seenItems[item.productId] = 1;
        output[outputIndex++] = item;
      }
    }
    return output;
  }

  render() {
    const totalPrice = this.props.cart.reduce((accumulator, item) => {
      return accumulator + (item.price * item.quantity / 100);
    }, 0);

    const cartItems = this.props.cart.map(product => {
      return <CartSummaryItems
        key={product.cartItemId}
        productId={product.productId}
        cartItemId={product.cartItemId}
        image={product.image}
        name={product.name}
        price={product.price}
        quantity={product.quantity}
        updateQuantity = {this.props.updateQuantity}
        shortDescription={product.shortDescription}/>;
    });

    const displayCheckoutButtonMD = cartItems.length ? 'd-none d-md-block' : 'd-none';
    const checkoutButtonMD = <button
      type="button"
      className={`btn btn-primary border-0 px-3 py-0 ${displayCheckoutButtonMD}`}
      style={{ height: 50 }}
      onClick={this.handleCheckoutClick}>
      Checkout
    </button>;

    const displayCheckoutButtonSM = cartItems.length ? 'd-md-none' : 'd-none';
    const checkoutButtonSM = <button
      type="button"
      className={`btn btn-primary border-0 p-0 col-4 ${displayCheckoutButtonSM}`}
      style={{ height: 50 }}
      onClick={this.handleCheckoutClick}>
      Checkout
    </button>;

    return (
      <div className="container col-9 m-3">
        <div className="row">
          <a
            type="button"
            className="back btn btn-link border-0 mb-3 text-muted text-decoration-none"
            href="#"
            onClick={this.handleCatalogClick}>
          &lt; Back to catalog
          </a>
        </div>
        <h2>My Cart</h2>
        {cartItems}
        <div className="row d-flex justify-content-between align-items-center m-0">
          <h2 className="my-3">Item Total: ${totalPrice.toFixed(2)}</h2>
          {checkoutButtonMD}
        </div>
        <div className="row d-flex justify-content-center align-items-center m-0">
          {checkoutButtonSM}
        </div>
      </div>
    );
  }
}
