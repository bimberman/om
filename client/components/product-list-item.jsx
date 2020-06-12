import React from 'react';

export default class ProductListItem extends React.Component {

  render() {
    const { name, price, image } = this.props;
    let shortDescription = this.props.shortDescription;

    if (shortDescription.length > 110) {
      shortDescription = shortDescription.substr(0, 109).concat(String.fromCharCode(8230));
    }
    return (
      <div className="container card col-3 m-3" style={{ height: '60vh' }}>
        <img
          src={image}
          className="card-img-top img-icon img-thumbnail mt-3"
          alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{shortDescription}</p>
          <h5 className="card-title">{`$${parseInt(price / 100)}.${price % 100}`}</h5>
        </div>
      </div>
    );
  }
}
