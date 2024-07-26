import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>

      <HorizontalCardProduct category={"erigo"} heading={"Top T-shirt Erigo"} />
      <HorizontalCardProduct category={"AllbrandIphone"} heading={"Popular's IPhone"} />

      <VerticalCardProduct category={"Mouse"} heading={"Mouse"} />
      <VerticalCardProduct category={"Greenlight"} heading={"Top T-shirt Greenlight."}/>
      <VerticalCardProduct category={"Bloods"} heading={"Top T-shirt Bloods."}/>
      <VerticalCardProduct category={"Brainwave"} heading={"Top T-shirt Brainwave"}/>
      <VerticalCardProduct category={"3Second"} heading={"Top T-shirt 3Second"}/>
    </div>
  )
}

export default Home