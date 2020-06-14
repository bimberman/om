import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      isLoading: true
    };
    this.handleViewClick = this.handleViewClick.bind(this);
    this.handleCartClick = this.handleCartClick.bind(this);
  }

  componentDidMount() {
    this.getProduct(this.props.productId);
  }

  handleViewClick() {
    this.props.setView('catalog', {});
  }

  handleCartClick() {
    this.props.addToCart(this.state.product);
  }

  getProduct(productId) {
    fetch(`/api/products/${productId}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ product: data });
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    let name, price, shortDescription, image, longDescription;
    if (this.state.product !== null) {
      name = this.state.product.name;
      price = this.state.product.price;
      shortDescription = this.state.product.shortDescription;
      longDescription = this.state.product.longDescription;
      image = this.state.product.image;
      if (shortDescription.length > 110) {
        shortDescription = shortDescription.substr(0, 109).concat(String.fromCharCode(8230));
      }
    }
    return this.state.product === null
      ? <h1>Waiting for a product...</h1>
      : <div className="container card col-9 m-3">
        <div className="row">
          <a
            type="button"
            className="btn btn-link border-0 text-muted text-decoration-none"
            href="#"
            onClick={this.handleViewClick}>
              &lt; Back to catalog
          </a>
        </div>
        <div className="row m-2">
          <img
            src={image}
            className="card-img-left col-4 my-3"
            alt="..." />
          <div className="card-body col-8">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">{shortDescription}</p>
            <h5 className="card-title text-muted">{`$${parseInt(price / 100)}.${price % 100}`}</h5>
            <a
              href="#"
              className="btn btn-primary"
              onClick={this.handleCartClick}>
                Add to cart
            </a>
          </div>
          <p>{longDescription}</p>
        </div>
      </div>;
  }
}
