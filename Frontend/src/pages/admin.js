import React from 'react'
import '../Styles/admin.css'

function admin() {
  return (
    <div className = "admin">
        <div className = 'admin_pres'>
            <h1>President</h1>
            <button>Open President Vote</button>
            <button>Close President Vote</button>
        </div>
        <div className = 'admin_mem'>
            <h1>Membership</h1>
            <button>Open Membership Vote</button>
            <button>Close Membership Vote</button>
        </div>
        <div className = 'admin_ao'>
            <h1>Alumni Outreach</h1>
            <button>Open AO Vote</button>
            <button>Close AO Vote</button>
        </div>
        <div className = 'admin_se'>
            <h1>Student Engagement</h1>
            <button>Open SE Vote</button>
            <button>Close SE Vote</button>
        </div>
        <div className = 'admin_mc'>
            <h1>Marketing Communications</h1>
            <button>Open Marketing Vote</button>
            <button>Close Marketing Vote</button>
        </div>
        <div className = 'admin_finance'>
            <h1>Finance</h1>
            <button>Open Finance Vote</button>
            <button>Close Finance Vote</button>
        </div>
        <div className = 'admin_ib'>
            <h1>Inclusion and Belonging</h1>
            <button>Open I&B Vote</button>
            <button>Close I&B Vote</button>
        </div>
    </div>
  )
}

export default admin
