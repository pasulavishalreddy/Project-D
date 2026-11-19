import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Header from '../Header/Header'
import PromoBanner from './PromoBanner'
import NewArrivalsSection from './NewArrivales'
import Infinite_scroll from "./Infinite_scroll"
import Google_review from "./Google_review"
import MensFAQAccordion from './FAQAccordion'
import Footer from '../Footer/Footer'
import TailoringServices from '../TailoringServices/TailoringServices'

export default function LandingPageHome({addToCart}) {
  return (
    <div>
         {/* <Header/> */}
    <PromoBanner/>
    <TailoringServices/>
    <NewArrivalsSection/>
    
    <Google_review/>
    <MensFAQAccordion/>
    {/* <Infinite_scroll/> */}
    <Infinite_scroll addToCart={addToCart}/>
    <Footer/>
    </div>
  )
}
