""" Hello, world! """
from flask import jsonify

from server import APP


@APP.route("/api/<version>/hello")
def hello(version):
    """ Привет мир """
    return jsonify("Hello, world! {}".format(version))
