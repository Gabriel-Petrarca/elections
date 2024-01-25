import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/votescreen.css';

function Finance() {
  const [Finance_Candidates, setFinance_Candidates] = useState([]);
  const [optionChosen, setOptionChosen] = useState("");
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(""); // State to store user's email
  const timestamp = new Date().getTime();

  useEffect(() => {
    const fetchVotingStatus = async () => {
      try {
        const response = await fetch(`/get_voting_status?_t=${timestamp}`);
        const data = await response.json();
        if (!data.voting_status.Finance) {
          // Voting for Finance is closed, redirect to the home page
          navigate('/');
        } else {
          // Voting is open, fetch candidates
          fetchCandidates();
        }
      } catch (error) {
        console.error('Error fetching voting status:', error);
      }
    };

    const fetchData = async () => {
      try {
        const response = await fetch('/get_voter');
        const data = await response.json();
        if (data.user_email === null) {
          // User is not logged in, redirect to the login page
          navigate('/login');
        } else {
          setUserEmail(data.user_email);
          fetchVotingStatus();
        }
      } catch (error) {
        console.error('Error fetching user email:', error);
      }
    };

    fetchData();
  }, [navigate]);

  const fetchCandidates = () => {
    fetch(`/finance_candidates?_t=${timestamp}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched candidates data:', data);
        setFinance_Candidates(data.finance_candidates);
      })
      .catch((error) => console.error('Error fetching candidates:', error));
  };

  const submitVote = async (role, voter, candidate) => {
    try {
      // Make a POST request to submit the vote
      const response = await fetch('/submit_vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role, voter, candidate }),
      });

      if (response.ok) {
        // If the vote submission was successful, navigate to the "thanks for voting" page
        navigate('/thanksforvoting');
      } else {
        console.error('Failed to submit vote:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting vote:', error.message);
    }
  };

  return (
    <div className="Finance">
      <div className="vote_for_name">
        <h1>Vote for VP of Finance</h1>
        <div className="candidates">
          {Finance_Candidates.map((candidate, index) => (
            <button key={index} onClick={() => setOptionChosen(candidate)}>
              {candidate}
            </button>
          ))}
        </div>
        <button
          className="submit_vote_button"
          onClick={() => submitVote('Finance', userEmail, optionChosen)}
        >
          Submit Vote
        </button>
      </div>
    </div>
  );
}

export default Finance;
