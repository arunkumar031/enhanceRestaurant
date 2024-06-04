import {Component} from 'react'
import {AiOutlineShoppingCart} from 'react-icons/ai'

import Menu from '../Menu'
import DishItem from '../DishItem'
import CartContext from '../../context/cartContext'

import './index.css'

class Home extends Component {
  state = {
    data: {},
    menuList: [],
    activeMenuId: '',
    dishesList: [],
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const response = await fetch(
      'https://run.mocky.io/v3/72562bef-1d10-4cf5-bd26-8b0c53460a8e',
    )
    const data = await response.json()
    console.log(data[0])
    const activeMenuId = data[0].table_menu_list[0].menu_category_id
    const menuList = data[0].table_menu_list
    const dishesList = data[0].table_menu_list[0].category_dishes
    console.log(dishesList)
    this.setState({data: data[0], activeMenuId, menuList, dishesList})
  }

  onClickMenu = id => {
    const {menuList} = this.state
    const dishesList = menuList.filter(each => each.menu_category_id === id)[0]
      .category_dishes
    console.log(dishesList)
    this.setState({activeMenuId: id, dishesList})
  }

  header = () => {
    const {data} = this.state
    const restaurantName = data.restaurant_name
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value
          return (
            <div className="nav">
              <h1>{restaurantName}</h1>
              <div className="cart-container">
                <p className="my-orders">My Orders</p>
                <p>
                  <AiOutlineShoppingCart />
                  {cartList.length}
                </p>
              </div>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }

  menus = () => {
    const {menuList, activeMenuId} = this.state
    return (
      <ul className="menus">
        {menuList.map(each => (
          <Menu
            key={each.menu_category_id}
            menuDetails={each}
            isActive={activeMenuId === each.menu_category_id}
            onClickMenu={this.onClickMenu}
          />
        ))}
      </ul>
    )
  }

  dishes = () => {
    const {dishesList} = this.state
    return (
      <ul className="dishes">
        {dishesList.map(each => (
          <DishItem key={each.dish_id} dishDetails={each} />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div>
        {this.header()}
        <hr />
        {this.menus()}
        {this.dishes()}
      </div>
    )
  }
}

export default Home
