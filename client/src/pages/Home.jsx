import React from 'react'
import Hero from '../components/Hero'
import FeaturedDestination from '../components/FeaturedDestination'
import ExclusiveOffer from '../components/ExclusiveOffer'
import Tesimonial from '../components/Tesimonial'
import NewsLetter from '../components/NewsLetter'
import RecommendedHotels from '../components/RecommendedHotels'

const Home = () => {
  return (
    <>
        <Hero />
        <RecommendedHotels/>
        <FeaturedDestination/>
        <ExclusiveOffer/>
        <Tesimonial/>
        <NewsLetter/>
    </>
  )
}

export default Home