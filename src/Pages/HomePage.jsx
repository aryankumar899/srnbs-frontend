import React from 'react'
import Navbar from '../Component/Navbar'
import HeroSection from '../Component/HeroSection'
import OwnerSection from '../Component/OwnerSection'
import Footer from '../Component/Footer'
import ImportantLinksWithQuote from '../Component/ImportantLinksWithQuote'
import AboutWhatsNew from '../Component/AboutWhatsNew'


function HomePage() {
  return <>
    {/* <Navbar /> */}
    <HeroSection/>
    <OwnerSection />
    <ImportantLinksWithQuote />
    <AboutWhatsNew/>
    {/* <Footer /> */}

  </>
}

export default HomePage