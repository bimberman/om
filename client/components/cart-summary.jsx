import React from 'react';
import CartSummaryItems from './cart-summary-item';

export default class CartSummary extends React.Component {

  constructor(props) {
    super(props);
    this.handleViewClick = this.handleViewClick.bind(this);
  }

  handleViewClick() {
    this.props.setView('catalog', {});
  }

  render() {
    const totalPrice = this.props.cart.reduce((accumulator, item) => {

      return accumulator + item.price / 100;
    }, 0);
    const cartItems = this.props.cart.map(item => {
      return <CartSummaryItems
        key={item.cartItemId}
        image={item.image}
        name={item.name}
        price={item.price}
        shortDescription={item.shortDescription}/>;
    });
    return (
      <div className="container col-9 m-3">
        <div className="row">
          <a
            type="button"
            className="btn btn-link border-0 text-muted text-decoration-none"
            href="#"
            onClick={this.handleViewClick}>
            &lt; Back to catalog
          </a>
        </div>
        <h2>My Cart</h2>
        {cartItems}
        <div className="row">
          <h2 className="my-3">Item Total: ${totalPrice}</h2>
        </div>
      </div>
    );
  }
}
