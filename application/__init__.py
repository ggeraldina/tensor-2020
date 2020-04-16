""" The application """
from flask import Flask, jsonify, send_file

APP = Flask(__name__)

@APP.route("/")
@APP.route("/index")
def index():
    """ Вход """
    return send_file('./static/html/index.html')

@APP.route("/hello")
def hello():
    """ Привет мир """
    return jsonify("Hello, world!")
