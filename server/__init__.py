""" Билетная касса театра """
import os

from flask import Flask, jsonify
from flask_pymongo import PyMongo

from .encoder import MongoJSONEncoder

APP = Flask(__name__, static_folder="../client")
APP.json_encoder = MongoJSONEncoder
APP.config["JSON_AS_ASCII"] = False
APP.config["MONGO_URI"] = os.environ["MONGO_URI"]
MONGO = PyMongo(APP) # retryWrites=False, если вдруг потребуется

from .database import create_collections

create_collections()

from .data_db import add_data_in_db

if os.environ.get("FLASK_ENV") == "development" and MONGO.db.event.count_documents({}) == 0:
    add_data_in_db()

from . import views
from .api import events_list, booking
