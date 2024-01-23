import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import '../Styles/admin.css'


const Admin = () => {
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const response = await fetch('/check_admin_status', {
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setIsAdmin(data.is_admin);
        } else {
          console.error('Error checking admin status');
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
      }
    };

    checkAdminStatus();
  }, []);

  if (isAdmin == false){
    return <Navigate to="/login" />;
  }

  const handleVoteAction = async (action, role) => {
    try {
      const endpoint = action === 'open' ? `/open_vote/${role}` : `/close_vote/${role}`;
  
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(`Success: ${data.message}`);
        // Handle any UI updates or redirects as needed
      } else {
        console.error(`Error: Unable to ${action} ${role} voting`);
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
