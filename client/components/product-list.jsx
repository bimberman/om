import React from 'react';
import ProductListItem from './product-list-item';
import ProductDetailsModal from './product-details-modal';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      detailedProduct: {}
    };
    this.detailedProduct = {};
    this.openDetailedModal = this.openDetailedModal.bind(this);
    this.closeDetailedModal = this.closeDetailedModal.bind(this);
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        const products = data.map((product, index) => {
          const imgList = product.imgList.split(',');
          return {
            ...product, imgList: imgList
          };
        });
        this.setState({ products: products });
      })
      .catch(err => {
        console.error(err);
      });
  }

  openDetailedModal(productId) {
    this.setState({ detailedProduct: this.state.products.find(product => product.productId === productId) });
  }

  closeDetailedModal() {
    this.setState({ detailedProduct: {} });
  }

  render() {
    const productListItems = this.state.products.map((product, index) => {
      return (
        <ProductListItem
          key={product.productId}
          productId={product.productId}
          name={product.name}
          price={product.price}
          shortDescription={product.shortDescription}
          longDescription={product.longDescription}
          image={product.image}
          openDetailedModal={this.openDetailedModal}>
        </ProductListItem>
      );
    });

    const modal = Object.keys(this.state.detailedProduct).length === 0
      ? null
      : <ProductDetailsModal
        product = {this.state.detailedProduct}
        showModal = {true}
        closeDetailedModal={this.closeDetailedModal}
        addToCart={this.props.addToCart}>
      </ProductDetailsModal>;
    return (
      <div className="product-list row col-10">
        {productListItems}
        {modal}
      </div>
    );
  }
}
