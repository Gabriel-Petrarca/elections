import React, {useState, useEffect} from 'react'
import SAClogo from '../assets (images)/SAClogowhite.png'
import { Link, useNavigate } from 'react-router-dom'
import ReorderIcon from '@mui/icons-material/Reorder';
import '../Styles/Navbar.css'


/* creates all of the links at the top of the screen in the red box*/
/* creates the drop down menu icon that appears when the screen is a smaller size*/
/* includes the log out button that redirects users back to the login page */

function Navbar() {

    const [openLinks, setOpenLinks] = useState(false)
    const navigate = useNavigate();

    const toggleNavbar = () =>{
        setOpenLinks(!openLinks)
    };

    const logout = async () => {
      try {
        const response = await fetch('/logout', {
          method: 'GET',
          credentials: 'include', // Include credentials in the request
        });
  
        if (response.ok) {
          // Logout was successful
          navigate('/login'); // Redirect to the login page
        } else {
          console.error('Error logging out');
        }
      } catch (error) {
        console.error('Error logging out:', error);
      }
    };

    /* handles the resize of the window when it goes back and forth between small and large screen */
    useEffect(() => {
      const handleResize = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth > 600) {
          setOpenLinks(false);
        }
      };
      
      window.addEventListener('resize', handleResize);
      
      handleResize();
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    /* creates the links and the logo that appear at the top of the different size screens */
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
<<<<<<< Updated upstream
=======
            <Link to="/admin">Admin</Link>
>>>>>>> Stashed changes
            
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
<<<<<<< Updated upstream
=======
        <Link to="/admin">Admin</Link>
>>>>>>> Stashed changes
        <button onClick={toggleNavbar}>
          <ReorderIcon />
        </button>
      </div>
      <button onClick={logout}>Log Out</button>
    </div>
  )
}

export default Navbar
