from flask import Flask, render_template, session, request, redirect, url_for, jsonify
from flask_cors import CORS
from google_sheet import emails, record_vote, get_pres_candidates

app = Flask(__name__, template_folder='../../frontend/src')
CORS(app)
app.config['SECRET_KEY'] = "coolWebsite"

has_voted = {}
voting_status = {'President' : False, 'Membership' : False, 'AO' : False, 'SE' : False, 'Marketing' : False, 'Finance' : False, 'I&B' : False}

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

@app.route('/get_voting_status')
def getJsonVoteStatus():
    return jsonify({'voting_status': voting_status})

@app.route('/pres_candidates')
def pres_candidates():
    # Fetch candidate information and return as JSON
    candidate_data = get_pres_candidates()
    return jsonify({'pres_candidates': candidate_data})


@app.route('/submit_vote', methods=['POST'])
def handle_submit_vote():
    data = request.json
    role = data.get('role')
    voter = data.get('voter')
    candidate = data.get('candidate')

    if role and voter and candidate:
        record_vote(candidate, voter, role)
        return jsonify({'success': True})
    else:
        return jsonify({'error': 'Invalid data'}), 400

@app.route('/open_vote')
def open_vote(user, role):
    if user.lower() == "osusaccos@gmail.com":
        voting_status[role] = True

@app.route('/close_vote')
def close_vote(user, role):
    if user.lower() == "osusaccos@gmail.com":
        voting_status[role] = False

if __name__ == '__main__':
    app.run(debug=True)