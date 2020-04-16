""" The application """
from flask import Flask, jsonify

APP = Flask(__name__)

@APP.route("/")
@APP.route("/index")
def post_list():
    """ Привет мир """
    return jsonify("Hello, world!")
