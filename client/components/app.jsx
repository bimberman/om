import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: {
        name: 'catalog',
        params: {}
      }
    };
    this.setView = this.setView.bind(this);
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  setView(name, params) {
    this.setState(prevState => {
      return {
        ...prevState,
        view: {
          name: name,
          params: params
        }
      };
    });
  }

  render() {
    const body = this.state.view.name === 'catalog'
      ? <ProductList setView={this.setView}/>
      : <ProductDetails
        setView={this.setView}
        productId={this.state.view.params.productId}/>;
    return (
      <div className="container-fluid mx-0 px-0">
        <div className="row d-fled justify-content-center w-100 mx-0 px-0">
          <Header/>
          {body}
        </div>
      </div>
    );
  }
}
