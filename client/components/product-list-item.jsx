import React from 'react';

export default class ProductListItem extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.openDetailedModal(this.props.productId);
  }

  render() {
    const { name, price, image } = this.props;
    let shortDescription = this.props.shortDescription;
    if (shortDescription.length > 60) {
      shortDescription = shortDescription.substr(0, 59).concat(String.fromCharCode(8230));
    }

    return (
      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">
        <div
          className="card mb-4"
          onClick={this.handleClick}>
          <img
            src={image}
            className="card-img-top catalog-img img-thumbnail mt-3 border-0"
            style={{ height: '20vh' }}
            alt="..." />
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">{shortDescription}</p>
            <h5 className="card-title text-muted">{`$${parseInt(price / 100)}.${price % 100}`}</h5>
          </div>
        </div>
      </div>
    );
  }
}
