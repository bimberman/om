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
    this.invalidInput = this.invalidInput.bind(this);
    this.validInput = this.validInput.bind(this);
    this.validateName = this.validateName.bind(this);
    this.validateCreditCard = this.validateCreditCard.bind(this);
  }

  handleChange(event) {
    const changedElement = event.target.dataset.stateProperty;
    const value = event.target.value;

    if (changedElement === 'name') {
      document.getElementById('nameHelp').classList.add('d-none');
      if (this.validateName(value)) {
        this.validInput(event.target);
      } else {
        this.invalidInput(event.target);
      }
    }

    if (changedElement === 'creditCard') {
      if (this.validateCreditCard(value)) {
        this.validInput(event.target);
      } else {
        this.invalidInput(event.target);
      }
    }

    if (changedElement === 'shippingAddress') {
      if (value) {
        this.validInput(event.target);
      } else {
        this.invalidInput(event.target);
      }
    }

    this.setState(prevState => {
      return {
        ...prevState,
        [changedElement]: value
      };
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    if (value) {
      this.validInput(target);
    } else {
      this.invalidInput(target);
    }

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
    const { name, creditCard, shippingAddress, checked } = this.state;
    const validName = this.validateName(name);
    const validCC = this.validateCreditCard(creditCard);
    if (validName && validCC && shippingAddress && checked) {
      this.props.placeOrder({
        name: this.state.name,
        creditCard: this.state.creditCard,
        shippingAddress: this.state.shippingAddress
      });
    }

    if (!validName) {
      this.invalidInput(document.getElementById('user-name'));
    }

    if (!validCC) {
      this.invalidInput(document.getElementById('credit-card'));
    }

    if (!shippingAddress) {
      this.invalidInput(document.getElementById('shipping-address'));
    }

    if (!checked) {
      this.invalidInput(document.getElementById('checkbox'));
    }
  }

  invalidInput(input) {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
  }

  validInput(input) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
  }

  validateName(name) {
    const nRegex = /^[a-zA-Z\s]+/;

    if (name && nRegex.test(name)) {
      return true;
    }
    return false;
  }

  validateCreditCard(cc) {
    const ccRegex = /^[0-9 -]+/;

    if (cc && ccRegex.test(cc)) {
      return true;
    }
    return false;
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
      <div className="container col-10 mb-5">
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
        <form className="needs-validation">
          <div className="form-group">
            <label htmlFor="user-name">Name</label>
            <input
              type="text"
              className="form-control"
              id="user-name"
              data-state-property="name"
              aria-describedby="nameHelp"
              onChange={this.handleChange}
              required
              value={nameValue} />
            <div className="valid-feedback">
              Looks good!
            </div>
            <div className="invalid-feedback">
              Please provide a valid name.
            </div>
            <small id="nameHelp" className="form-text text-muted">Please enter your full name</small>
          </div>
          <div className="form-group">
            <label htmlFor="credit-card">Credit Card</label>
            <input
              type="number"
              className="form-control"
              id="credit-card"
              data-state-property="creditCard"
              onChange={this.handleChange}
              required
              value={creditCardValue} />
            <div className="valid-feedback">
              Looks good!
            </div>
            <div className="invalid-feedback">
              Please provide a valid credit card number.
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="shipping-address">Shipping Address</label>
            <textarea
              className="form-control"
              data-state-property="shippingAddress"
              onChange={this.handleChange}
              id="shipping-address"
              rows="10"
              value={shippingAddressValue}></textarea>
            <div className="valid-feedback">
              Looks good!
            </div>
            <div className="invalid-feedback">
              Please provide a shipping address.
            </div>
          </div>
          <div className="form-group">
            <div className="form-check">
              <input
                className="form-check-input"
                onChange={this.handleInputChange}
                type="checkbox"
                value=""
                id="checkbox"
                required/>
              <label className="form-check-label" htmlFor="checkbox">
                I acknowledge that this website is used for demonstration purposes only. This site will not sell any commercial product and I will not share any personal information on this site!
              </label>
              <div className="invalid-feedback">
                  You must agree before submitting.
              </div>
            </div>
          </div>
          <button
            type="submit"
            onClick={this.handleSubmitClick}
            className="btn btn-primary">
              Place Order
          </button>
        </form>
      </div>
    );
  }
}
