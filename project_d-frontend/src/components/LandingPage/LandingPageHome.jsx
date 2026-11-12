import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Header from '../Header/Header'
import PromoBanner from './PromoBanner'
import NewArrivalsSection from './NewArrivales'

export default function LandingPageHome() {
  return (
    <div>
         {/* <Header/> */}
    <PromoBanner/>
    <NewArrivalsSection/>
    </div>
  )
}
