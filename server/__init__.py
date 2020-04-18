""" Билетная касса театра """
import os

from flask import Flask, jsonify

APP = Flask(__name__, static_folder='../client')

from server.api import hello  # pylint: disable=wrong-import-position
from . import views  # pylint: disable=wrong-import-position
