import { React, useState} from 'react'
import Header from '../../components/Header/Header'
import './Home.css'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'

const Home = () => {

  const [category, setCategory] = useState("All")

  return (
    <div className='home'>
        <Header />
        <ExploreMenu category={category} setCategory={setCategory} />
        <FoodDisplay category={category}/>
    </div>
  )
}

export default Home
