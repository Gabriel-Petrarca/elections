import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/votescreen.css';
import '.../Backend/google_sheet.py'

function President() {
  const sheet= 'sheet'
  const [optionChosen, setOptionChosen] = useState("")

  return (
    <div className="President">
      <div className="headerContainer">
        <h1>Vote for President</h1>
        <div className="candidates">
          <button onClick={() => setOptionChosen("A")}>{Candidate1}</button>
          <button>{Candidate2}</button>
          <button>{Candidate3}</button>
          <button>{Candidate4}</button>
        </div>
        <button>Submit Vote</button>
      </div>
    </div>
  );
}

export default President;
