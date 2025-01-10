
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import DiscountSection from './Discount'
import TopCategories from './Top'
import CustomDiv from './Custom'
import FurnitureBanner from './Banner'
import Blog from './Blog'
import FeaturedProducts from '@/app/FeatureProduct/page'
import LatestProducts from '@/app/LatestProduct/page'
import TrendingProducts from '@/app/TrendingProducts/page'

import OurFeature from '@/app/OurFeatures/page'

const Hero = () => {
    return (
      <div>
      <div className="mb-5">
        <FurnitureBanner />
        <FeaturedProducts/>
        <LatestProducts/>
      </div>
    
      
    
      
    
      <div className="text-[#1A0B5B] text-[32px] md:text-[42px] font-serif flex justify-center mt-10 mb-5">
        What Shopex Offers
      </div>
    
      <OurFeature/>
      <TrendingProducts/>
    
      <div className="mt-10">
        <DiscountSection />
        <TopCategories />
        <CustomDiv />
        <Blog />
      </div>
    </div>
    
    )
}

export default Hero