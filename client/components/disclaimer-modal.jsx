import React from 'react';

export default class DisclaimerModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      checked: false
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {

  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    if (value) {
      target.classList.add('is-valid');
      target.classList.remove('is-invalid');
    } else {
      target.classList.remove('is-valid');
      target.classList.add('is-invalid');
    }

    this.setState({
      checked: value
    });
  }

  handleClose() {
    if (this.state.checked) {
      this.setState({ open: false });
      this.props.setView('catalog', {});
    } else {
      document.getElementById('checkbox').classList.add('is-invalid');
    }
  }

  handleCartClick() {
    this.handleClose();
  }

  render() {
    const display = this.state.open ? 'd-block' : 'd-none';

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
              <h5 className="modal-title">Disclaimer</h5>
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
                  <form className="needs-validation">
                    <div className="form-group">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          checked={this.state.checked}
                          onChange={this.handleInputChange}
                          type="checkbox"
                          value=""
                          id="checkbox"
                          required />
                        <label className="form-check-label" htmlFor="checkbox">
                          I acknowledge that this website is used for demonstration purposes only. This site will not sell any commercial product and I will not share any personal information on this site!
                        </label>
                        <div className="invalid-feedback">
                          You must agree before exploring the site.
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="modal-footer">
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
