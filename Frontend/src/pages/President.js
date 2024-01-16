import React, {useState, useEffect} from 'react';
import socketIOClient from 'socket.io-client'
import { Link } from 'react-router-dom';
import '../Styles/votescreen.css';

const socket = socketIOClient('http://localhost:5000'); 

function President() {
  const [Pres_Candidates, setPres_Candidates] =useState([]);
  const [optionChosen, setOptionChosen] = useState("")

  useEffect(() => {
    fetchCandidates();

    socket.on('update_candidates', data => {
      console.log('Received data from server:', data);
      setPres_Candidates(data.pres_candidates);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchCandidates = () => {
    fetch('/api/pres_candidates')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched candidates data:', data);
        setPres_Candidates(data.pres_candidates);
      })
      .catch(error => console.error('Error fetching candidates:', error));
  };
  
  const submit_Vote = (role, voter, candidate) => {
    socket.emit('submit_vote', { role, voter, candidate });
  };

  return (
    <div className="President">
      <div className="headerContainer">
        <h1>Vote for President</h1>
        <div className="candidates">
          {Pres_Candidates.map(candidate => (
            <button key={candidate.id} onClick={() => setOptionChosen(candidate.id)}>
              {candidate.name}
            </button>
          ))}
        </div>
        <button>Submit Vote</button>
      </div>
    </div>
  );
}

export default President;
