from flask import Flask, render_template
from flask_socketio import socketio

app = Flask(__name__)
app.config['SECRET'] = "coolWebsite"
