from flask import Flask, render_template, session, request, redirect, url_for, jsonify
from flask_socketio import SocketIO
from google_sheet import emails, record_vote, get_pres_candidates

app = Flask(__name__, template_folder='../../frontend/src')
app.config['SECRET'] = "coolWebsite"
socketio = SocketIO(app)

has_voted = {}
voting_status = {'President' : False, 'Membership' : False, 'AO' : False, 'SE' : False, 'Marketing' : False, 'Finance' : False, 'I&B' : False}

@app.route('/voting_status')
def getJsonVoteStatus():
    return jsonify({'voting_status': voting_status})

@app.route('/api/pres_candidates')
def pres_candidates():
    # Fetch candidate information and return as JSON
    candidate_data = get_pres_candidates()
    return jsonify({'pres_candidates': candidate_data})

@app.route('/login', methods=['POST'])
def login():
    email = request.form.get('email')

    if email in emails:
        session['user_email'] = email
        return redirect(url_for('index'))
    else:
        return 'Invalid email'
    
@app.route('/logout')
def logout():
    session.pop('user_email', None)
    return redirect(url_for('index'))

@socketio.on('submit_vote')
def handle_submit_vote(data):
    role = data['role']
    voter = data['voter']
    candidate = data['candidate']
    
    record_vote(candidate, voter, role)

    # Emit event to confirm vote submission to the specific client
    socketio.emit('vote_submitted_confirmation', {'role': role, 'voter': voter, 'candidate': candidate})

@app.route('/open_vote/<role>')
def open_vote(role, canidate):
    if canidate.lower() == "sacadminaccount":
        voting_status[role] = True

@app.route('/close_vote/<role>')
def close_vote(role, canidate):
    if canidate.lower() == "sacadminaccount":
        voting_status[role] = False

if __name__ == '__main__':
    app.run(host = "localhost",port=5000, debug = True)
    socketio.run(app)