""" Представление/вид приложения """
from flask import send_from_directory

from . import APP


@APP.errorhandler(404)
def page_not_found(_):
    """ Если не API, перенаправляем на страницы сайта """
    return send_from_directory(APP.static_folder, 'index.html'), 200


@APP.errorhandler(500)
def page_server_error(_):
    """ 500 страница """
    return send_from_directory(APP.static_folder, 'index.html'), 500
