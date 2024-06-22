import CartContext from '../../context/cartContext'

import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      } = value
      const {itemDetails} = props

      const increaseDishQuantity = () => {
        incrementCartItemQuantity(itemDetails.dish_id)
      }

      const decreaseDishQuantity = () => {
        decrementCartItemQuantity(itemDetails.dish_id)
      }

      const onClickRemoveBtn = () => {
        removeCartItem(itemDetails.dish_id)
      }

      return (
        <li className="item-details">
          <img
            src={itemDetails.dish_image}
            alt={itemDetails.dish_name}
            className="item-img"
          />
          <h1>{itemDetails.dish_name}</h1>
          <div className="quantity-controller-container">
            <button
              className="quantity-controller-btn"
              type="button"
              onClick={decreaseDishQuantity}
            >
              -
            </button>
            <p>{itemDetails.quantity}</p>
            <button
              className="quantity-controller-btn"
              type="button"
              onClick={increaseDishQuantity}
            >
              +
            </button>
          </div>
          <p>
            {itemDetails.dish_currency}{' '}
            {itemDetails.dish_price * itemDetails.quantity}/-
          </p>
          <button
            type="button"
            onClick={onClickRemoveBtn}
            className="remove-btn"
          >
            Remove
          </button>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
