""" Представление/вид приложения """
from flask import send_from_directory

from . import APP


@APP.route("/")
@APP.route("/index")
@APP.route("/reservation")
def index():
    """ Страницы сайта """
    return send_from_directory(APP.static_folder, 'index.html')

@APP.errorhandler(404)
def page_not_found(_):
    """ 404 страница """
    return send_from_directory(APP.static_folder, 'index.html'), 404

@APP.errorhandler(500)
def page_server_error(_):
    """ 500 страница """
    return send_from_directory(APP.static_folder, 'index.html'), 500
