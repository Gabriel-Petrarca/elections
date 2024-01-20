import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/votescreen.css';

function Membership() {
  const [Memb_Candidates, setMemb_Candidates] = useState([]);
  const [optionChosen, setOptionChosen] = useState("");
  const navigate = useNavigate();
  

  useEffect(() => {
    fetch('/get_voting_status')
      .then((response) => response.json())
      .then((data) => {
        if (!data.voting_status.Membership) {
          // Voting for Membership is closed, redirect to the home page
          navigate('/');
        } else {
          // Voting is open, fetch candidates
          fetchCandidates();
        }
      })
      .catch((error) => console.error('Error fetching voting status:', error));
  }, []);


  // Retrieves the candidates from the google sheets by using the api created in app.py
  const fetchCandidates = () => {
    fetch('/memb_candidates')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched candidates data:', data);
        setMemb_Candidates(data.memb_candidates);
      })
      .catch((error) => console.error('Error fetching candidates:', error));
  };

  // Records the vote in the google sheet
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

  // Format of the page
  return (
    <div className="Membership">
      <div className="vote_for_name">
        <h1>Vote for Membership</h1>
        <div className="candidates">
          {Memb_Candidates.map((candidate, index) => (
            <button key={index} onClick={() => setOptionChosen(candidate)}>
              {candidate}
            </button>
          ))}
        </div>
        <button
          className="submit_vote_button"
          onClick={() => submitVote('Membership', voter, optionChosen)}
        >
          Submit Vote
        </button>
      </div>
    </div>
  );
}

export default Membership;
