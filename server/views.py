""" Представление/вид приложения """
from flask import send_from_directory

from . import APP


@APP.route("/")
@APP.route("/index")
def index():
    """ Главная страница """
    return send_from_directory(APP.static_folder, 'index.html')

@APP.route("/list_events")
def list_events():
    """ Mock list events GET """
    return send_from_directory(APP.static_folder, 'mock_pages/list_events_get_request.html')

@APP.route("/booking")
def booking():
    """ Mock booking POST """
    return send_from_directory(APP.static_folder, 'mock_pages/booking_post_request.html')
