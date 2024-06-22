import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import Menu from '../Menu'
import DishItem from '../DishItem'
// import CartContext from '../../context/cartContext'

import './index.css'

class Home extends Component {
  state = {
    menuList: [],
    activeMenuId: '',
    dishesList: [],
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(
      'https://run.mocky.io/v3/2477b10c-ee18-4487-9962-1b3d073432c4',
      options,
    )
    console.log(response)
    const data = await response.json()
    console.log(data[0])
    const activeMenuId = data[0].table_menu_list[0].menu_category_id
    const menuList = data[0].table_menu_list
    const dishesList = data[0].table_menu_list[0].category_dishes
    console.log(dishesList)
    this.setState({activeMenuId, menuList, dishesList})
  }

  onClickMenu = id => {
    const {menuList} = this.state
    const dishesList = menuList.filter(each => each.menu_category_id === id)[0]
      .category_dishes
    console.log(dishesList)
    this.setState({activeMenuId: id, dishesList})
  }

  menus = () => {
    const {menuList, activeMenuId} = this.state
    return (
      <div className='menus'>
        {menuList.map(each => (
          <Menu
            key={each.menu_category_id}
            menuDetails={each}
            isActive={activeMenuId === each.menu_category_id}
            onClickMenu={this.onClickMenu}
          />
        ))}
      </div>
    )
  }

  dishes = () => {
    const {dishesList} = this.state
    return (
      <ul className='dishes'>
        {dishesList.map(each => (
          <DishItem key={each.dish_id} dishDetails={each} />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div>
        <Header />
        {this.menus()}
        {this.dishes()}
      </div>
    )
  }
}

export default Home
