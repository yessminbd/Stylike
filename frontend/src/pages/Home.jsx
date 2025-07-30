import React from 'react'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import NewArrivals from '../components/NewArrivals'
import Popular from '../components/Popular'
import Features from '../components/Features'

const Home = () => {
  return (
    <>
      <Hero />
      <NewArrivals />
      <Popular />
      <Features />
      <Footer />
    </>
  )
}

export default Home
