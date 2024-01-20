from flask import Flask, render_template, session, request, redirect, url_for, jsonify
from flask_cors import CORS, cross_origin
from google_sheet import emails, record_vote, get_pres_candidates, voters_map, get_AO_candidates, get_Finance_candidates, get_IandB_candidates, get_MC_candidates, get_memb_candidates, get_SE_candidates, login_info, add_vote, role_col

app = Flask(__name__, template_folder='../../frontend/src')
CORS(app, supports_credentials=True)
app.config['SECRET_KEY'] = "coolWebsite"
app.config['SESSION_TYPE'] = 'filesystem'

voting_status = {'President' : True, 'Membership' : True, 'AO' : False, 'SE' : False, 'Marketing' : False, 'Finance' : False, 'I&B' : False}
pres_candidate_data = get_pres_candidates()
memb_candidates_data = get_memb_candidates()
AO_candidates_data = get_AO_candidates()
SE_candidates_data = get_SE_candidates()
MC_candidates_data = get_MC_candidates
finance_candidates_data = get_Finance_candidates()
IandB_candidates_data = get_IandB_candidates()

@app.route('/login', methods=['POST'])
@cross_origin(supports_credentials=True)
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
    
    elif email.capitalize() in emails and password == "SACelections":
        is_admin = False
        session['user_email'] = email  # Store user email in session
        return jsonify({'redirect': '/', 'is_admin': is_admin})
    else:
        is_admin = False
        return jsonify({'error': 'Invalid credentials', 'is_admin': is_admin}), 401

@app.route('/logout')
@cross_origin(supports_credentials=True)
def logout():
    session.pop('user_email', None)
    return jsonify({'message': 'Logout successful'}), 200

@app.route('/check_admin_status')
@cross_origin(supports_credentials=True)
def check_admin_status():
    user_email = session.get('user_email')
    is_admin = True if user_email == "osusaccos@gmail.com" else False
    print(f"UserEmail : {user_email}, Is Admin: {is_admin}")
    return jsonify({'user_email': user_email, 'is_admin': is_admin})

@app.route('/get_voter')
@cross_origin(supports_credentials=True)
def get_voter():
    user_email = session.get('user_email')
    print(f"UserEmail : {user_email}")
    return jsonify({'user_email': user_email})

@app.route('/get_voting_status')
@cross_origin(supports_credentials=True)
def getJsonVoteStatus():
    return jsonify({'voting_status': voting_status})

@app.route('/submit_vote', methods=['POST'])
@cross_origin(supports_credentials=True)
def handle_submit_vote():
    data = request.json
    role = data.get('role')
    voter = data.get('voter')
    candidate = data.get('candidate')
    
    if role and voter and candidate:
        add_vote(voter, candidate)
        if len(voters_map) >= 3:
            record_vote()
            return jsonify({'success': True})
        else:
            return jsonify({'message': 'Vote recorded, but not yet enough votes to finalize'}), 200
    else:
        return jsonify({'error': 'Invalid data'}), 400


@app.route('/open_vote')
@cross_origin(supports_credentials=True)
def open_vote(user, role):
    role_col += 1
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
@cross_origin(supports_credentials=True)
def close_vote(user, role):
    if user.lower() == "osusaccos@gmail.com":
        voting_status[role] = False

@app.route('/pres_candidates')
@cross_origin(supports_credentials=True)
def pres_candidates():
    # Fetch candidate information and return as JSON
    return jsonify({'pres_candidates': pres_candidate_data})

@app.route('/memb_candidates')
@cross_origin(supports_credentials=True)
def memb_candidates():
    # Fetch candidate information and return as JSON
    return jsonify({'memb_candidates': memb_candidates_data})

@app.route('/AO_candidates')
@cross_origin(supports_credentials=True)
def AO_candidates():
    # Fetch candidate information and return as JSON
    return jsonify({'AO_candidates': AO_candidates_data})

@app.route('/SE_candidates')
@cross_origin(supports_credentials=True)
def SE_candidates():
    # Fetch candidate information and return as JSON
    return jsonify({'SE_candidates': SE_candidates_data})

@app.route('/MC_candidates')
@cross_origin(supports_credentials=True)
def MC_candidates():
    # Fetch candidate information and return as JSON
    return jsonify({'MC_candidates': MC_candidates_data})

@app.route('/finance_candidates')
@cross_origin(supports_credentials=True)
def finance_candidates():
    # Fetch candidate information and return as JSON
    return jsonify({'finance_candidates': finance_candidates_data})

@app.route('/IandB_candidates')
@cross_origin(supports_credentials=True)
def IandB_candidates():
    # Fetch candidate information and return as JSON
    return jsonify({'IandB_candidates': IandB_candidates_data})
if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=5000)