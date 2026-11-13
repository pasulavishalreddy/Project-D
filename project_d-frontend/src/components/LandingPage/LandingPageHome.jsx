import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Header from '../Header/Header'
import PromoBanner from './PromoBanner'
import NewArrivalsSection from './NewArrivales'
import Infinite_scroll from "./Infinite_scroll"

export default function LandingPageHome() {
  return (
    <div>
         {/* <Header/> */}
    <PromoBanner/>
    <NewArrivalsSection/>
    <Infinite_scroll/>
    </div>
  )
}
