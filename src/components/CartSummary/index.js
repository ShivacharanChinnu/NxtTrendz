// Write your code here
import {Component} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

class CartSummary extends Component {
  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value
          let totalPrice = 0
          cartList.map(element => {
            totalPrice += element.price * element.quantity
            return null
          })
          const len = cartList.length
          return (
            <div>
              <div className="CartSummerydiv">
                <h1>
                  Order Total <span>{totalPrice}</span>
                </h1>
                <p>{len} items in cart</p>
                <button>Checkout</button>
              </div>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}
export default CartSummary
