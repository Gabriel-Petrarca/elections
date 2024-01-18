import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/votescreen.css';
import { useSocket } from '/home/gabriel/elections/Frontend/src/socketContext.js';

function President() {
  const [Pres_Candidates, setPres_Candidates] = useState([]);
  const [optionChosen, setOptionChosen] = useState("");
  const navigate = useNavigate();
  const socket = useSocket(); // Use the useSocket hook to access the WebSocket instance

  useEffect(() => {
    fetchCandidates();

    // Observe the connection event
    socket.on('connect', () => {
      console.log('Frontend connected');
    });

    socket.on('update_candidates', (data) => {
      console.log('Received data from server:', data);
      setPres_Candidates(data.pres_candidates);
    });

    return () => {
      // Clean up socket connection when the component unmounts
      socket.disconnect();
    };
  }, [socket]); // Run once when the component mounts

  const fetchCandidates = () => {
    fetch('/api/pres_candidates')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched candidates data:', data);
        setPres_Candidates(data.pres_candidates);
      })
      .catch((error) => console.error('Error fetching candidates:', error));
  };

  const submitVote = (role, voter, candidate) => {
    socket.emit('submit_vote', { role, voter, candidate });
    navigate('/thanksforvoting');
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
