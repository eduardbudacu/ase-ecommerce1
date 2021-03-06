import React, { Component } from 'react';
import './App.css';
import HeaderContainer from './containers/HeaderContainer';
import CategoriesContainer from './containers/CategoriesContainer'
import ProductsContainer from './containers/ProductsContainer'
import CartContainer from './containers/CartContainer'

import { gateway as MoltinGateway } from '@moltin/sdk';

const Moltin = MoltinGateway({
  client_id: '3vUPyzQFiporJfx9gIA3V0WA1UFJ1IxSn7HBpWlsqz'
});

class App extends Component {
  constructor() {
    super();

    this.state = {
      categories: [],
      products: [],
      cart: {data:[]}
    }
  }

  componentDidMount() {
    Moltin.Categories.All().then((response) => {
      this.setState({categories: response.data})
    })

    Moltin.Products.With('main_images').All().then((response) => {
      this.setState({products: response.data})
    })

    this.LoadCart();
  }

  AddProduct = (id, qty) => {
    Moltin.Cart().AddProduct(id, qty).then((item) => {
      this.LoadCart()
    })
  }

  LoadCart = () => {
    Moltin.Cart().Items().then((response) => {
      this.setState({cart: response})
    });
  }

  render() {
    return (
      <div className="App">
        <HeaderContainer />
        <CategoriesContainer categories={this.state.categories} />
        <ProductsContainer products={this.state.products} AddProduct={this.AddProduct}/>
        <CartContainer cart={this.state.cart} />
      </div>
    );
  }
}

export default App;
