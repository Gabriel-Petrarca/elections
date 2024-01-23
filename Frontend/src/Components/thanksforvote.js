import React, {useState, useContext} from 'react'
import '../styles/president.css'
import live from '../Components/presidentvote'
import thanks from '../Components/thanksforvote'

import { VoteContext } from '../helpers/Contexts'


function President() {
  const [voteState, setVoteState] = useState("live");

    return (
    <div className='President'>
      <h1>President Vote</h1>
      <VoteContext.Provider value={{voteState, setVoteState}}>
      {voteState === "live" && <presidentvote />}
      {voteState === "thanks" && <thanksforvote />}
      </VoteContext.Provider>

    </div>
  )
}

export default President
