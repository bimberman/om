import React from 'react';

export default class Header extends React.Component {

  constructor(props) {
    super(props);
    this.handleCartClick = this.handleCartClick.bind(this);
    this.handleCatalogClick = this.handleCatalogClick.bind(this);
  }

  handleCartClick() {
    this.props.setView('cart');
  }

  handleCatalogClick() {
    this.props.setView('catalog', {});
  }

  render() {
    return (
      <div className="w-100 bg-dark py-3 d-flex align-items-center justify-content-between">
        <a type="button" className="btn d-flex align-items-center" onClick={this.handleCatalogClick}>
          <h2 className="text-white text-center ml-5"><i className="fas fa-om"></i> Om</h2>
        </a>
        <button
          type="button"
          className="btn border-0"
          onClick={this.handleCartClick}
        >
          <span className="text-white align-baseline">{this.props.cartItemCount} Items &nbsp;</span>
          <i className="fa fa-shopping-cart fa-2x text-white mr-5 align-baseline" aria-hidden="true"></i>
        </button>
      </div>
    );
  }
}
