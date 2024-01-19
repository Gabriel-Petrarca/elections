import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/admin.css'


function Admin() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // New state for login status
    const navigate = useNavigate();
  
    useEffect(() => {
      const checkAdminStatus = async () => {
        try {
          const response = await fetch('/check_admin_status');
          const result = await response.json();
  
          if (response.ok) {
            setIsAdmin(result.is_admin);
            setIsLoggedIn(true); // Set login status to true if admin
          } else {
            console.error(result.error || "Error checking admin status");
            setIsLoggedIn(false); // Set login status to false if not admin
          }
        } catch (error) {
          console.error("Error checking admin status:", error);
          setIsLoggedIn(false);
        }
      };
  
      checkAdminStatus();
    }, []);
  
    useEffect(() => {
      // Redirect logic based on login and admin status
      if (!isLoggedIn) {
        // Redirect to login page if not logged in
        navigate('/login');
      } else if (isLoggedIn && !isAdmin) {
        // Redirect to home if logged in but not admin
        navigate('/');
      }
    }, [isLoggedIn, isAdmin, navigate]);
  
    const handleVoteAction = async (action, role) => {
      try {
        const response = await fetch(`/open_vote?role=${role}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          console.log(`Successfully ${action}ed ${role} voting`);
          // Handle any UI updates or redirects as needed
        } else {
          console.error(`Error ${action}ing ${role} voting`);
          // Handle error scenarios
        }
      } catch (error) {
        console.error('Error during vote action:', error);
      }
    };
  
  return (
    <div className = "admin">
        <div className = 'admin_pres'>
            <h1>President</h1>
            <button onClick={() => handleVoteAction('open', 'President')}>Open President Vote</button>
            <button onClick={() => handleVoteAction('close', 'President')}>Close President Vote</button>
        </div>
        <div className = 'admin_mem'>
            <h1>Membership</h1>
            <button onClick={() => handleVoteAction('open', 'Membership')}>Open Membership Vote</button>
            <button onClick={() => handleVoteAction('close', 'Membership')}>Close Membership Vote</button>
        </div>
        <div className = 'admin_ao'>
            <h1>Alumni Outreach</h1>
            <button onClick={() => handleVoteAction('open', 'AO')}>Open Alumni Outreach Vote</button>
            <button onClick={() => handleVoteAction('close', 'AO')}>Close President Vote</button>
        </div>
        <div className = 'admin_se'>
            <h1>Student Engagement</h1>
            <button onClick={() => handleVoteAction('open', 'SE')}>Open Student Engagement Vote</button>
            <button onClick={() => handleVoteAction('close', 'SE')}>Close Student Engagement Vote</button>
        </div>
        <div className = 'admin_mc'>
            <h1>Marketing Communications</h1>
            <button onClick={() => handleVoteAction('open', 'MC')}>Open Marketing Communications Vote</button>
            <button onClick={() => handleVoteAction('close', 'MC')}>Close Marketing Communications Vote</button>
        </div>
        <div className = 'admin_finance'>
            <h1>Finance</h1>
            <button onClick={() => handleVoteAction('open', 'Finance')}>Open Finance Vote</button>
            <button onClick={() => handleVoteAction('close', 'Finance')}>Close Finance Vote</button>
        </div>
        <div className = 'admin_ib'>
            <h1>Inclusion and Belonging</h1>
            <button onClick={() => handleVoteAction('open', 'IandB')}>Open Inclusion and Belonging Vote</button>
            <button onClick={() => handleVoteAction('close', 'IandB')}>Close Inclusion and Belonging Vote</button>
        </div>
    </div>
  )
}

export default Admin
