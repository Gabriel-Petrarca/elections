from flask_socketio import socketio

@socketio.on('vote')
def handle_vote(vote):
    
