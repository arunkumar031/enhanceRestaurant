import CartContext from '../../context/cartContext'
import Header from '../Header'
import CartItem from '../CartItem'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const onClickRemoveAll = () => {
        removeAllCartItems()
      }
      return (
        <>
          <Header />
          {cartList.length ? (
            <div className="cart">
              <button
                type="button"
                className="remove-all-btn"
                onClick={onClickRemoveAll}
              >
                Remove All
              </button>
              <ul className="cart-list">
                {cartList.map(each => (
                  <CartItem key={each.dish_id} itemDetails={each} />
                ))}
              </ul>
            </div>
          ) : (
            <div className="empty-cart">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
                alt="empty_cart"
              />
            </div>
          )}
        </>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
