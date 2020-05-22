""" Представление/вид приложения """
from flask import send_from_directory

from . import APP


@APP.route("/")
@APP.route("/index")
def index():
    """ Главная страница """
    return send_from_directory(APP.static_folder, 'index.html')


@APP.route("/events_list")
def events_list():
    """ Mock list events GET """
    return send_from_directory(APP.static_folder, 'mock_pages/events_list_get_request.html')


@APP.route("/booking")
def booking():
    """ Mock booking POST """
    return send_from_directory(APP.static_folder, 'mock_pages/booking_post_request.html')


@APP.route("/event")
def event():
    """ Mock event GET """
    return send_from_directory(APP.static_folder, 'mock_pages/event_get_request.html')


@APP.route("/bookings_list")
def bookings_list():
    """ Mock bookings list GET """
    return send_from_directory(APP.static_folder, 'mock_pages/bookings_list_get_request.html')


@APP.route("/cancel_booking_post")
def cancel_booking_post():
    """ Mock cancel booking list GET """
    return send_from_directory(APP.static_folder, 'mock_pages/canceling_booking_post_request.html')
