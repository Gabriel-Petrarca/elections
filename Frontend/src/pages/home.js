import React from 'react'
import {Link} from "react-router-dom"
import BannerImage from "../assets (images)/SACBackground.png";
import '../Styles/home.css'

function home() {
  return (
    <div className= "home"
       style = {{ background: `url(${BannerImage})` }}
       >
      <div 
        className="headerContainer" 
      >
        <h1>SAC Elections </h1>
        <p> Please wait for further instructions to vote </p>
        
      </div>
    </div>
  )
}

export default home
