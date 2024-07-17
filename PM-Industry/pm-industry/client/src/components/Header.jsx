import React from 'react'
import '../styles/header.scss'
import log from '../assets/22logo.png'

const Header = () => {
  return (
    <div className='NavBarU'>
       <div className="leftn">
       <div className="logo">
       <img src={log} alt="" />
       </div>
      </div>
      <div className="rightn">
        <div className="navbarItemU">
          <a href="/">Home</a>
          <a href="/properties">Properties</a>
          <a href="/">Room Design</a>
          <a href="/">Gallery</a>
          <a href="/uploader">Cost Prediction</a>
          <a href="/contact">Contact Us</a>
        </div>
        </div>
     
        
        
    </div>
  )
}

export default Header
