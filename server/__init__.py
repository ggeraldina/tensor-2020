""" Билетная касса театра """
import os

from flask import Flask, jsonify
from flask_pymongo import PyMongo

from .utils.encoder import MongoJSONEncoder

APP = Flask(__name__, static_folder="../client/build", static_url_path='/')
APP.json_encoder = MongoJSONEncoder
APP.config["JSON_AS_ASCII"] = False
APP.config["MONGO_URI"] = os.environ["MONGO_URI"]
MONGO = PyMongo(APP)

from .db.database import create_collections

create_collections()

from . import views
from .api import events_list, booking, event, bookings_list
