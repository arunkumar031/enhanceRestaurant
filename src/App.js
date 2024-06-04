import {Component} from 'react'
import CartContext from './context/cartContext'
import Home from './components/Home'
import './App.css'

// write your code here
class App extends Component {
  state = {cartList: []}

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  addCartItem = item => {
    const {cartList} = this.state
    const {quantity} = item

    const itemPresent = cartList.find(each => each.dish_id === item.dish_id)
    console.log(cartList)
    console.log(itemPresent)
    if (itemPresent === undefined) {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, item],
      }))
    } else {
      const updatedCartItem = {
        ...item,
        quantity: itemPresent.quantity + quantity,
      }
      this.setState(prevState => ({
        cartList: [
          ...prevState.cartList.filter(each => each.dish_id !== item.dish_id),
          updatedCartItem,
        ],
      }))
    }
  }

  removeCartItem = id => {
    this.setState(prevState => ({
      cartList: [...prevState.cartList.filter(each => each.dish_id !== id)],
    }))
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const cartItem = cartList.find(each => each.dish_id === id)
    const {quantity} = cartItem
    const updatedCartItem = {...cartItem, quantity}
    this.setState(prevState => ({
      cartList: [
        ...prevState.cartList.filter(each => each.dish_id !== id),
        updatedCartItem,
      ],
    }))
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const cartItem = cartList.find(each => each.dish_id === id)
    const {quantity} = cartItem
    if (quantity > 1) {
      const updatedCartItem = {...cartItem, quantity: quantity - 1}
      this.setState(prevState => ({
        cartList: [
          ...prevState.cartList.filter(each => each.dish_id !== id),
          updatedCartItem,
        ],
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  render() {
    const {cartList} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Home />
      </CartContext.Provider>
    )
  }
}

export default App
