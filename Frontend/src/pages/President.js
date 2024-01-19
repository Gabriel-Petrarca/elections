import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/votescreen.css';

function President() {
  const [Pres_Candidates, setPres_Candidates] = useState([]);
  const [optionChosen, setOptionChosen] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchCandidates();
  }, []);


  const fetchCandidates = () => {
    fetch('/pres_candidates')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched candidates data:', data);
        setPres_Candidates(data.pres_candidates);
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
    <div className="President">
      <div className="vote_for_name">
        <h1>Vote for President</h1>
        <div className="candidates">
          {Pres_Candidates.map((candidate, index) => (
            <button key={index} onClick={() => setOptionChosen(candidate)}>
              {candidate}
            </button>
          ))}
        </div>
        <button
          className="submit_vote_button"
          onClick={() => submitVote('President', 'Petrarca.26@buckeyemail.osu.edu', optionChosen)}
        >
          Submit Vote
        </button>
      </div>
    </div>
  );
}

export default President;
