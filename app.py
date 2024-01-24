from flask import Flask, render_template, session, request, redirect, url_for, jsonify
from flask.helpers import send_from_directory
from flask_cors import CORS, cross_origin
from config import current_col
from google_sheet import emails, user_logout, record_vote, get_pres_candidates, voters_map, get_AO_candidates, get_Finance_candidates, get_IandB_candidates, get_MC_candidates, get_memb_candidates, get_SE_candidates, login_info, add_vote, get_othervote_options, get_othervote_prompt

app = Flask(__name__, static_folder='Frontend/build', static_url_path='')
CORS(app, supports_credentials=True)
app.config['SECRET_KEY'] = "coolWebsite"
app.config['SESSION_TYPE'] = 'filesystem'

voting_status = {'President' : False, 'Membership' : False, 'AO' : False, 'SE' : False, 'Marketing' : False, 'Finance' : False, 'I&B' : False, 'Othervote' : False}
pres_candidate_data = get_pres_candidates()
memb_candidates_data = get_memb_candidates()
AO_candidates_data = get_AO_candidates() 
SE_candidates_data = get_SE_candidates()
MC_candidates_data = get_MC_candidates
finance_candidates_data = get_Finance_candidates()
IandB_candidates_data = get_IandB_candidates()
othervote_prompt_data = get_othervote_prompt()
othervote_options_data = get_othervote_options()


# Function to add no-cache headers
def add_no_cache_headers(response):
    response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    response.headers['Pragma'] = 'no-cache'
    response.headers['Expires'] = '0'
    return response

@app.after_request
def apply_no_cache(response):
    no_cache_routes = [
        'no_cache', 'get_voter',
        'getJsonVoteStatus', 'handle_submit_vote', 'open_vote', 'close_vote',
        'pres_candidates', 'memb_candidates', 'AO_candidates', 'SE_candidates',
        'MC_candidates', 'finance_candidates', 'IandB_candidates', 'othervote_prompt',
        'othervote_options', 'open_vote', 'close_vote'
    ]

    if request.endpoint in no_cache_routes:
        return add_no_cache_headers(response)
    return response

@app.route('/login', methods=['POST'])
@cross_origin(supports_credentials=True)
def login():
    data = request.get_json()
    email = data.get('email').capitalize()
    password = data.get('password')

    if email.lower() == "osusaccos@gmail.com":
        # this is how to do other votes logic as well
        admin_password = login_info.acell('D2').value
        if password == admin_password:
            is_admin = True
            session['user_email'] = email.lower()  # Store user email in session
            return jsonify({'redirect': '/', 'is_admin': is_admin})
    
    elif email in emails and password == "SACelections":
        is_admin = False
        session['user_email'] = email  # Store user email in session
        return jsonify({'redirect': '/', 'is_admin': is_admin})
    else:
        is_admin = False
        return jsonify({'error': 'Invalid credentials', 'is_admin': is_admin}), 401

@app.route('/logout', methods=['GET', 'POST'])
@cross_origin(supports_credentials=True)
def logout():
    # before popping the user we want to get the data (who logged out) this may be wrong
    user_email = session.get('user_email')
    result = user_logout(user_email)

    if result['status'] == 'success':
        session.pop('user_email', None)

    return jsonify({'user logged out' : user_email}), 200


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
    global current_col
    data = request.json
    role = data.get('role')
    voter = data.get('voter')
    candidate = data.get('candidate')
    
    if role and voter and candidate:
        add_vote(voter, candidate)
        if len(voters_map) >= 3:
            record_vote(current_col)
            return jsonify({'success': True, "col" : current_col})
        else:
            return jsonify({'message': 'Vote recorded, but not yet enough votes to finalize'}), 200
    else:
        return jsonify({'error': 'Invalid data'}), 400


@app.route('/open_vote/<role>')
@cross_origin(supports_credentials=True)
def open_vote(role):
    global pres_candidate_data, memb_candidates_data, AO_candidates_data, SE_candidates_data, MC_candidates_data, finance_candidates_data, IandB_candidates_data, current_col
    current_col += 1
    if role == "President":
        pres_candidate_data = get_pres_candidates()
        voting_status[role] = True
        voters_map.clear()
        return jsonify({"status": "success", "message": f"Vote for {role} opened successfully", "candidates": pres_candidate_data})
    elif role == "Membership":
        memb_candidates_data = get_memb_candidates()
        voting_status[role] = True
        voters_map.clear()
        return jsonify({"status": "success", "message": f"Vote for {role} opened successfully", "candidates": memb_candidates_data})
    elif role == "AO":
        AO_candidates_data = get_AO_candidates()
        voting_status[role] = True
        voters_map.clear()
        return jsonify({"status": "success", "message": f"Vote for {role} opened successfully", "candidates": AO_candidates_data})
    elif role == "SE":
        SE_candidates_data = get_SE_candidates()
        voting_status[role] = True
        voters_map.clear()
        return jsonify({"status": "success", "message": f"Vote for {role} opened successfully", "candidates": SE_candidates_data})
    elif role == "MC":
        MC_candidates_data = get_MC_candidates()
        voting_status[role] = True
        voters_map.clear()
        return jsonify({"status": "success", "message": f"Vote for {role} opened successfully", "candidates": MC_candidates_data})
    elif role == "Finance":
        finance_candidates_data = get_Finance_candidates()
        voting_status[role] = True
        voters_map.clear()
        return jsonify({"status": "success", "message": f"Vote for {role} opened successfully", "candidates": finance_candidates_data})
    elif role == "IandB":
        IandB_candidates_data = get_IandB_candidates()
        voting_status[role] = True
        voters_map.clear()
        return jsonify({"status": "success", "message": f"Vote for {role} opened successfully", "candidates": IandB_candidates_data})
    elif role == "Othervote":
        othervote_prompt_data = get_othervote_prompt()
        othervote_options_data = get_othervote_options()
        voting_status[role] = True
        voters_map.clear()
        return jsonify({"status": "success", "message": f"Vote for {role} opened successfully", "prompt": othervote_prompt_data, "options": othervote_options_data})
    
    
    return jsonify({"status": "success", "message": f"Vote for {role} opened successfully"})

@app.route('/close_vote/<role>')
@cross_origin(supports_credentials=True)
def close_vote(role):
    voting_status[role] = False
    return jsonify({"status": "success", "message": f"Vote for {role} closed successfully"})

@app.route('/pres_candidates')
@cross_origin(supports_credentials=True)
def pres_candidates():
    global pres_candidate_data
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


# api created for othervotes prompt and options
@app.route('/othervote_prompt')
@cross_origin(supports_credentials=True)
def othervote_prompt():
    return jsonify({'othervote_prompt': othervote_prompt_data})

@app.route('/othervote_options')
@cross_origin(supports_credentials=True)
def othervote_options():
    return jsonify({'othervote_options': othervote_options_data})

@app.route('/')
@cross_origin(supports_credentials=True)
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return app.send_static_file('index.html')

@app.errorhandler(404)   
def not_found(e):   
  return app.send_static_file('index.html')


if __name__ == '__main__':
    app.run(host='localhost', port=5000)