import React from 'react'
import {Link} from "react-router-dom"
import '../Styles/votescreen.css'
import '../Styles/home.css'
import BannerImage from "../assets (images)/SACBackground.png";

function thanksforvoting() {
  return (
    <div className= "thanksforvoting"
            style = {{ background: `url(${BannerImage})` }}
       >
      <div 
        className="headerContainer" 
      >
        <h1> Thanks for voting </h1>
        <p> Please wait for further instructions </p>
        
      </div>
    </div>
  )
}

export default thanksforvoting