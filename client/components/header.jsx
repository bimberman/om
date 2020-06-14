import React from 'react';

export default class Header extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.setView('cart');
  }

  render() {
    return (
      <div className="w-100 bg-dark py-3 d-flex align-items-center justify-content-between">
        <h2 className="text-white text-center ml-5"><i className="fas fa-dollar-sign"></i> Wicked Sales</h2>;
        <button
          type="button"
          className="btn border-0"
          onClick={this.handleClick}
        >
          <span className="text-white align-baseline">{this.props.cartItemCount} Items &nbsp;</span>
          <i className="fa fa-shopping-cart fa-2x text-white mr-5 align-baseline" aria-hidden="true"></i>
        </button>
      </div>
    );
  }
}
