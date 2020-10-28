import React from 'react';

export default class CheckoutForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: ''
    };
    this.handleCatalogClick = this.handleCatalogClick.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const changedElement = { [event.target.dataset.stateProperty]: event.target.value };
    this.setState(prevState => {
      return {
        ...prevState,
        ...changedElement
      };
    });
  }

  handleCatalogClick() {
    this.props.setView('catalog', {});
  }

  handleSubmitClick(event) {
    event.preventDefault();
    this.props.placeOrder({
      name: this.state.name,
      creditCard: this.state.creditCard,
      shippingAddress: this.state.shippingAddress
    });
    this.resetForm();
  }

  resetForm() {
    this.setState({
      name: '',
      creditCard: '',
      shippingAddress: ''
    });
  }

  render() {
    const { name: nameValue, creditCard: creditCardValue, shippingAddress: shippingAddressValue } = this.state;

    return (
      <div className="container">
        <div className="row">
          <a
            type="button"
            className="back btn btn-link border-0 mb-3 text-muted text-decoration-none"
            href="#"
            onClick={this.handleCatalogClick}>
            &lt; Back to catalog
          </a>
        </div>
        <h1 className="">My Cart</h1>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              data-state-property="name"
              aria-describedby="nameHelp"
              onChange={this.handleChange}
              required
              value={nameValue}/>
            <small id="nameHelp" className="form-text text-muted">Please enter your full name</small>
          </div>
          <div className="form-group">
            <label htmlFor="creditCard">Credit Card</label>
            <input
              type="text"
              className="form-control"
              id="creditCard"
              data-state-property="creditCard"
              onChange={this.handleChange}
              required
              value={creditCardValue}/>
          </div>
          <div className="form-group">
            <label htmlFor="shippingAddress">Shipping Address</label>
            <textarea
              className="form-control"
              data-state-property="shippingAddress"
              onChange={this.handleChange}
              id="shippingAddress"
              rows="10"
              value={shippingAddressValue}></textarea>
          </div>
          <div className="row d-flex justify-content-between m-0">
            <button
              type="button"
              onClick={this.handleSubmitClick}
              className="btn btn-primary">
              Place Order
            </button>
          </div>
        </form>
      </div>
    );
  }
}
