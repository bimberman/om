import React from 'react';
import ProductListItem from './product-list-item';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => this.setState({ products: data }))
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    const productListItems = this.state.products.map((product, index) => {
      return <ProductListItem key={index}/>;
    });
    return (
      <div className="product-list row d-flex justify-content-center">
        {productListItems}
      </div>
    );
  }
}
