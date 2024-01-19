from flask import Flask, render_template, session, request, redirect, url_for, jsonify
from flask_cors import CORS
from google_sheet import emails, record_vote, get_pres_candidates, voters_map, get_AO_candidates, get_Finance_candidates, get_IandB_candidates, get_MC_candidates, get_memb_candidates, get_SE_candidates, login_info

app = Flask(__name__, template_folder='../../frontend/src')
CORS(app)
app.config['SECRET_KEY'] = "coolWebsite"

voting_status = {'President' : False, 'Membership' : False, 'AO' : False, 'SE' : False, 'Marketing' : False, 'Finance' : False, 'I&B' : False}
pres_candidate_data = get_pres_candidates()
memb_candidates_data = get_memb_candidates()
AO_candidates_data = get_AO_candidates()
SE_candidates_data = get_SE_candidates()
MC_candidates_data = get_MC_candidates
finance_candidates_data = get_Finance_candidates()
IandB_candidates_data = get_IandB_candidates()

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if email == "osusaccos@gmail.com":
        admin_password = login_info.acell('D2').value
        if password == admin_password:
            is_admin = True
            session['user_email'] = email  # Store user email in session
            return jsonify({'redirect': '/', 'is_admin': is_admin})
    
    elif email in emails and password == "SACelections":
        is_admin = False
        session['user_email'] = email  # Store user email in session
        return jsonify({'redirect': '/', 'is_admin': is_admin})
    else:
        is_admin = False
        return jsonify({'error': 'Invalid credentials', 'is_admin': is_admin}), 401

@app.route('/logout')
def logout():
    session.pop('user_email', None)
    return redirect(url_for('index'))

@app.route('/check_admin_status')
def check_admin_status():
    is_admin = True if session.get('user_email') == "osusaccos@gmail.com" else False
    return jsonify({'is_admin': is_admin})

@app.route('/get_voting_status')
def getJsonVoteStatus():
    return jsonify({'voting_status': voting_status})

@app.route('/submit_vote', methods=['POST'])
def handle_submit_vote():
    data = request.json
    role = data.get('role')
    voter = data.get('voter')
    candidate = data.get('candidate')
    
    if role and voter and candidate and voter not in voters_map:
        record_vote(candidate, voter, role)
        return jsonify({'success': True})
    else:
        return jsonify({'error': 'Invalid data'}), 400

@app.route('/open_vote')
def open_vote(user, role):
    if user.lower() == "osusaccos@gmail.com":
        if role == "President":
            pres_candidate_data = get_pres_candidates()
        if role == "Membership":
            memb_candidates_data = get_memb_candidates()
        if role == "AO":
            AO_candidates_data = get_AO_candidates()
        if role == "SE":
            SE_candidates_data = get_SE_candidates()
        if role == "MC":
            MC_candidates_data = get_MC_candidates()
        if role == "Finance":
            finance_candidates_data = get_Finance_candidates()
        if role == "IandB":
            IandB_candidates = get_IandB_candidates()
        voting_status[role] = True
        voters_map.clear()

@app.route('/close_vote')
def close_vote(user, role):
    if user.lower() == "osusaccos@gmail.com":
        voting_status[role] = False

@app.route('/pres_candidates')
def pres_candidates():
    # Fetch candidate information and return as JSON
    return jsonify({'pres_candidates': pres_candidate_data})

@app.route('/memb_candidates')
def memb_candidates():
    # Fetch candidate information and return as JSON
    return jsonify({'memb_candidates': memb_candidates_data})

@app.route('/AO_candidates')
def AO_candidates():
    # Fetch candidate information and return as JSON
    return jsonify({'AO_candidates': AO_candidates_data})

@app.route('/SE_candidates')
def SE_candidates():
    # Fetch candidate information and return as JSON
    return jsonify({'SE_candidates': SE_candidates_data})

@app.route('/MC_candidates')
def MC_candidates():
    # Fetch candidate information and return as JSON
    return jsonify({'MC_candidates': MC_candidates_data})

@app.route('/finance_candidates')
def finance_candidates():
    # Fetch candidate information and return as JSON
    return jsonify({'finance_candidates': finance_candidates_data})

@app.route('/IandB_candidates')
def IandB_candidates():
    # Fetch candidate information and return as JSON
    return jsonify({'IandB_candidates': IandB_candidates_data})
if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=5000)