import {Component} from 'react'
import CartContext from '../../context/cartContext'

import './index.css'

class DishItem extends Component {
  state = {quantity: 0}

  increaseDishQuantity = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  decreaseDishQuantity = () => {
    this.setState(prevState => ({
      quantity: prevState.quantity > 1 ? prevState.quantity - 1 : 0,
    }))
  }

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {
            addCartItem,
            cartList,
            incrementCartItemQuantity,
            decrementCartItemQuantity,
          } = value

          const {dishDetails} = this.props
          const {quantity} = this.state
          const item = {...dishDetails, quantity}
          const cartItem = cartList.find(each => each.dish_id === item.dish_id)
          const onClickAddToCart = () => {
            addCartItem(item)
          }

          const increaseDishQuantity = () => {
            addCartItem({...item, quantity: 1})
          }

          const decreaseDishQuantity = () => {
            decrementCartItemQuantity(item.dish_id)
          }

          const dishTypeContainer =
            dishDetails.dish_Type === 2 ? 'veg-container' : 'non-veg-container'

          const dishType = dishDetails.dish_Type === 2 ? 'veg' : 'non-veg'

          return (
            <div className="dish-item">
              <div className={dishTypeContainer}>
                <p className={dishType}>.</p>
              </div>
              <div className="dish-details">
                <h1>{dishDetails.dish_name}</h1>
                <p>
                  {dishDetails.dish_currency} {dishDetails.dish_price}
                </p>
                <p>{dishDetails.dish_description}</p>
                {dishDetails.dish_Availability ? (
                  <div>
                    <div className="btn-container">
                      <div className="quantity-btn-container">
                        <button
                          className="minus-plus-btn"
                          type="button"
                          onClick={
                            cartList.length
                              ? decreaseDishQuantity
                              : this.decreaseDishQuantity
                          }
                        >
                          -
                        </button>
                        <p>{cartItem ? cartItem.quantity : item.quantity}</p>
                        <button
                          className="minus-plus-btn"
                          type="button"
                          onClick={increaseDishQuantity}
                        >
                          +
                        </button>
                      </div>
                      {quantity < 0 ? (
                        <button
                          className="add-to-cart-btn"
                          type="button"
                          onClick={onClickAddToCart}
                        >
                          ADD TO CART
                        </button>
                      ) : null}
                    </div>
                    {dishDetails.addonCat.length !== 0 ? (
                      <p className="customization">Customizations available</p>
                    ) : null}
                  </div>
                ) : (
                  <p className="not-available">Not available</p>
                )}
              </div>
              <div>
                <p className="calories">{dishDetails.dish_calories} calories</p>
              </div>
              <div>
                <img
                  className="dish-img"
                  src={dishDetails.dish_image}
                  alt={dishDetails.dish_name}
                />
              </div>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default DishItem
