import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/votescreen.css';

function President() {
  const Candidate1 = "Candidate 1";
  const Candidate2 = "Candidate 2";
  const Candidate3 = "Candidate 3";
  const Candidate4 = "Candidate 4";

  return (
    <div className="President">
      <div className="headerContainer">
        <h1>Vote for President</h1>
        <div className="candidates">
          <button>{Candidate1}</button>
          <button>{Candidate2}</button>
          <button>{Candidate3}</button>
          <button>{Candidate4}</button>
        </div>
      </div>
    </div>
  );
}

export default President;
