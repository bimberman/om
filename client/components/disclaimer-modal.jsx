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

    this.setState({
      checked: value
    });
  }

  handleClose() {
    if (this.state.checked) {
      this.setState({ open: false });
      this.props.setView('catalog', {});
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
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <input
                          type="checkbox"
                          checked={this.state.checked}
                          onChange={this.handleInputChange}
                          aria-label="Checkbox for following text input"/>
                      </div>
                      <div className="border d-flex">
                        <p className="font-italic p-2 m-0">I acknowledge that this website is used for demonstration purposes only. This site will not sell any commercial product and I will not share any personal information on this site!</p>
                      </div>
                    </div>
                  </div>
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
