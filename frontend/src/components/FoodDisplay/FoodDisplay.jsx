import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({ category }) => {

  const { food_list } = useContext(StoreContext)
  const foodArray = Object.values(food_list || {});
 
  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {foodArray.map((food, index) => {
          if (category === 'All' || category === food.category) {
            return <FoodItem key={index} id={food._id} name={food.name} description={food.description} price={food.price} image={food.image} />
          }
        })}
      </div>
    </div>
  )
}

export default FoodDisplay
