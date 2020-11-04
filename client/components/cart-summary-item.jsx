import React from 'react';

export default class CartSummaryItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      quantity: 1
    };
    this.subtractQuantity = this.subtractQuantity.bind(this);
    this.addQuantity = this.addQuantity.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
  }

  componentDidMount() {
    this.setState({ quantity: this.props.quantity });
  }

  addQuantity(event) {
    const newQuantity = this.state.quantity + 1;
    this.setState({ quantity: newQuantity });
    this.props.updateQuantity(this.props.cartItemId, newQuantity);
  }

  handleQuantityChange(event) {
    if (event.target.value >= 1) {
      this.setState({ quantity: event.target.value });
      this.props.updateQuantity(this.props.cartItemId, event.target.value);
    }
  }

  subtractQuantity(event) {
    if (this.state.quantity > 1) {
      const newQuantity = this.state.quantity - 1;
      this.setState({ quantity: newQuantity });
      this.props.updateQuantity(this.props.cartItemId, newQuantity);
    }
  }

  render() {
    const { image, name, price, shortDescription } = this.props;
    const { quantity } = this.state;
    return (
      <div className="container-lg card col-12 my-3">
        <div className="row m-2">
          <img
            src={image}
            className="card-img-left cart-img img-thumbnail my-3"
            alt="..." />
          <div className="card-body d-flex flex-column justify-content-between">
            <div className="card-body">
              <h5 className="card-title">{name}</h5>
              <h5 className="card-title text-muted">{`$${parseInt(price / 100)}.${price % 100}`}</h5>
              <p className="card-text">{shortDescription}</p>
            </div>
            <div className="d-flex justify-content-between align-items-end my-2">
              <form>
                <div className="col-auto">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <button type="button" className="btn minus input-group-text" onClick={this.subtractQuantity}>-</button>
                    </div>
                    <input type="text" value={quantity} onChange={this.handleQuantityChange} className="form-control col-3 text-center" id="inlineFormInputGroup" placeholder="1" />
                    <div className="input-group-append">
                      <button type="button" className="btn plus input-group-text" onClick={this.addQuantity}>+</button>
                    </div>
                  </div>
                </div>
              </form>
              <h5 className="text-muted p-0 m-0 mt-2">
                {`$${parseInt(price * quantity / 100)}.${price * quantity % 100}`}
              </h5>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
