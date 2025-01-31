import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/frontend_assets/assets'

const ExploreMenu = ({category, setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore our menu</h1>
        <p className='explore-menu-text'>Choose from a menu so diverse, even your taste buds will need a map! 🗺️🍽️ Crafted with top-notch ingredients and a dash of culinary magic, our dishes promise to satisfy cravings and turn every bite into a flavor-packed adventure! 😋🔥</p>
        <div className="explore-menu-list">
            {menu_list.map((item, index) => {
                return (
                    <div onClick={() => setCategory(prev=>prev === item.menu_name?"All":item.menu_name)} key={index} className="explore-menu-list-item">
                        <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                        <p>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
        <hr />
    </div>
  )
}

export default ExploreMenu
