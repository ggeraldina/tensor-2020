""" Представление/вид приложения """
from flask import send_from_directory

from . import APP


@APP.route("/")
@APP.route("/index")
@APP.route("/reservation")
def index():
    """ Главная страница """
    return send_from_directory(APP.static_folder, 'index.html')
