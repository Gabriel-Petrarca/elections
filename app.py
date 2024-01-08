from flask import Flask, render_template
from flask_socketio import SocketIO

app = Flask(__name__)
app.config['SECRET'] = "coolWebsite"
socketio = SocketIO(app)

@app.route("/")
def index():
    return "Hello world"

if __name__ == '__main__':
    app.run(host = "localhost", debug = True)
    socketio.run(app)
    