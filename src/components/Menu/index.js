import './index.css'

const Menu = props => {
  const {menuDetails, isActive, onClickMenu} = props
  const activeMenu = isActive ? 'active-menu' : ''
  const onClickMenuBtn = () => {
    onClickMenu(menuDetails.menu_category_id)
  }
  return (
    <button
      type="button"
      className={`menu ${activeMenu}`}
      onClick={onClickMenuBtn}
    >
      {menuDetails.menu_category}
    </button>
  )
}

export default Menu
