import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state
    const existingItem = cartList.find(element => element.id === product.id)
    if (existingItem === undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      const index = cartList.findIndex(element => element.id === product.id)
      cartList[index].quantity += 1
      this.setState({cartList})
    }
    //   TODO: Update the code here to implement addCartItem
  }

  removeCartItem = id => {
    const cartList = this.state
    console.log(cartList.cartList)
    const finalList = cartList.cartList.filter(element => element.id !== id)
    this.setState({cartList: finalList})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const index = cartList.findIndex(element => element.id === id)
    if (cartList[index].quantity <= 1) {
      const finalList = cartList.filter(element => element.id !== id)
      this.setState({cartList: finalList})
    } else {
      cartList[index].quantity -= 1
      this.setState({cartList})
    }
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const index = cartList.findIndex(element => element.id === id)
    cartList[index].quantity += 1
    this.setState({cartList})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
