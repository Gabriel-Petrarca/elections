import React, {useState} from 'react'
import SAClogo from '../assets (images)/SAClogowhite.png'
import { Link } from 'react-router-dom'
import ReorderIcon from '@mui/icons-material/Reorder';
import '../Styles/Navbar.css'

function Navbar() {

    const [openLinks, setOpenLinks] = useState(false)

    const toggleNavbar = () =>{
        setOpenLinks(!openLinks)
    };

  return (
    <div className="navbar">
      <div className="leftSide" id={openLinks ? "open" : "close"}>
        <img src={SAClogo} />
        <div className="hiddenLinks">
            <Link to="/"> Home </Link>
            <Link to="/president"> President </Link>
            <Link to="/membership"> Membership </Link>
            <Link to="/ao"> AO </Link>
            <Link to="/se"> SE </Link>
            <Link to="/marketing"> Marketing </Link>
            <Link to="/finance"> Finance </Link>
            <Link to="/i&b"> I&B </Link>
        </div>
      </div>
      <div className="rightSide">
        <Link to="/"> Home </Link>
        <Link to="/president"> President </Link>
        <Link to="/membership"> Membership </Link>
        <Link to="/ao"> AO </Link>
        <Link to="/se"> SE </Link>
        <Link to="/marketing"> Marketing </Link>
        <Link to="/finance"> Finance </Link>
        <Link to="/i&b"> I&B </Link>
        <button onClick={toggleNavbar}>
        <ReorderIcon />
        </button>
        </div>
    </div>
  )
}

export default Navbar
