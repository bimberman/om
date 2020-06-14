import React from 'react';

export default class CartSummaryItem extends React.Component {

  render() {
    const { image, name, price, shortDescription } = this.props;
    return (
      <div className="container card col-12 my-3">
        <div className="row m-2">
          <img
            src={image}
            className="card-img-left col-4 my-3"
            alt="..." />
          <div className="card-body col-8">
            <h5 className="card-title">{name}</h5>
            <h5 className="card-title text-muted">{`$${parseInt(price / 100)}.${price % 100}`}</h5>
            <p className="card-text">{shortDescription}</p>
          </div>
        </div>
      </div>
    );
  }
}
