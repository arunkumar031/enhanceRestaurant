import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiOutlineShoppingCart} from 'react-icons/ai'

import CartContext from '../../context/cartContext'

import './index.css'

const Header = props => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const onClickLogout = () => {
        Cookies.remove('jwt_token')
        const {history} = props
        history.replace('/login')
      }
      return (
        <>
          <div className="nav">
            <Link to="/">
              <h1>UNI Resto Cafe</h1>
            </Link>
            <div className="cart-container">
              <p className="my-orders">My Orders</p>
              <Link to="/cart">
                <button data-testid="cart" type="button">
                  <AiOutlineShoppingCart />
                  <span className="cart-count">{cartList.length}</span>
                </button>
              </Link>
              <button
                className="logout-btn"
                type="button"
                onClick={onClickLogout}
              >
                Logout
              </button>
            </div>
          </div>
          <hr />
        </>
      )
    }}
  </CartContext.Consumer>
)

export default withRouter(Header)
