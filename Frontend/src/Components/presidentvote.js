import React, {useContext} from 'react'
import { VoteContext } from '../helpers/Contexts'

function presidentvote() {
    const {voteState, setVoteState} = useContext(VoteContext)

  return (
    <div className = "President">
        <h1>Vote for President</h1>
        <div>className="candidates"
        <button>{Candidate1}</button>
        </div>
    </div>
  )
}

export default presidentvote
