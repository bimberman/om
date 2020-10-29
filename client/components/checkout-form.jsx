import React from 'react';

export default class CheckoutForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: '',
      checked: false
    };
    this.handleCatalogClick = this.handleCatalogClick.bind(this);
    this.handleCartClick = this.handleCartClick.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
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

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      checked: value
    });
  }

  handleCatalogClick() {
    this.props.setView('catalog', {});
  }

  handleCartClick() {
    this.props.setView('cart', {});
  }

  handleSubmitClick(event) {
    event.preventDefault();
    if (this.state.checked) {
      this.props.placeOrder({
        name: this.state.name,
        creditCard: this.state.creditCard,
        shippingAddress: this.state.shippingAddress
      });
    }
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
          <a
            type="button"
            className="back btn btn-link border-0 mb-3 text-muted text-decoration-none"
            href="#">
            /
          </a>
          <a
            type="button"
            className="back btn btn-link border-0 mb-3 text-muted text-decoration-none"
            href="#"
            onClick={this.handleCartClick}>
            &lt; Back to cart
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
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <input
                    type="checkbox"
                    checked={this.state.checked}
                    onChange={this.handleInputChange}
                    aria-label="Checkbox for following text input" />
                </div>
                <div className="border d-flex">
                  <p className="font-italic p-2 m-0">I acknowledge that this website is used for demonstration purposes only. This site will not sell any commercial product and I will not share any personal information on this site!</p>
                </div>
              </div>
            </div>
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
