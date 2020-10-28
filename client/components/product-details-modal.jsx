import React from 'react';

export default class ProductDetailsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      product: {}
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleCartClick = this.handleCartClick.bind(this);
  }

  componentDidMount() {
    this.setState({ open: this.props.showModal, product: this.props.product });
  }

  handleClose() {
    this.setState({ open: true });
    this.props.closeDetailedModal();
  }

  handleCartClick() {
    this.props.addToCart(this.state.product);
    this.handleClose();
  }

  render() {
    const display = this.state.open ? 'd-block' : 'd-none';
    const { name, image, price, longDescription } = this.props.product;

    return (
      <div
        className={`product-detail-modal modal ${display}`}
        tabIndex="1"
        role="dialog"
        aria-labelledby="detailedModal">
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{name}</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={this.handleClose}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="container">
                <div className="row m-2">
                  <img
                    src={image}
                    className="card-img-left col-4 m-0 p-0"
                    alt="..." />
                  <div className="d-flex flex-column justify-content-between col-8">
                    <p>{longDescription}</p>
                    <div className="d-flex justify-content-end align-items-end">
                      <h5 className="text-muted p-0 m-0 mt-auto">
                        {`$${parseInt(price / 100)}.${price % 100}`}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.handleCartClick}>
                  Add to cart
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={this.handleClose}>
                  Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
