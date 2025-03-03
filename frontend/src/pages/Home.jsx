import React from 'react'
import HeroSection from '../components/home/HeroSection'
import HowItWorks from '../components/home/HowItWorks'
import WhyChooseUs from '../components/home/WhyChooseUs'
import Testimonials from '../components/home/Testimonials'
import CTASection from '../components/home/CTASection'

const Home = () => {
  return (
    <>
    <HeroSection></HeroSection>
    <HowItWorks></HowItWorks>
    <WhyChooseUs></WhyChooseUs>
    <Testimonials></Testimonials>
    <CTASection></CTASection>
    </>
  )
}

export default Home