""" Список мероприятий для главной страницы """
from flask import jsonify, request

from server import APP, MONGO
from server.exception.error_data_db import ErrorDataDB


@APP.route("/api/<version>/get_events_list", methods=["GET"])
def get_events_list(version):
    """ Получить список мероприятий """
    if version != "v1":
        return jsonify({"message": "Некорректная версия", "events_list": [], "hasmore": False})
    try:
        skip = parse_positive_int(request.args.get("offset"))
        limit = parse_positive_int(request.args.get("limit"))
    except ErrorDataDB as error_db:
        return jsonify({"message": error_db.message, "events_list": [], "hasmore": False})
    cursor = MONGO.db.event.find(
        {},
        {
            "_id": 1,
            "title": 1,
            "photo": 1,
            "start_time": 1
        }
    ).sort("start_time").skip(skip).limit(limit)
    events = list(cursor)
    for event in events:
        event["id"] = event.pop("_id")
    hasmore = is_has_more_event(skip, limit)
    return jsonify({"events_list": events, "hasmore": hasmore})


def is_has_more_event(skip, limit):
    """ Есть ли еще мероприятия? """
    offset = skip + limit
    count = MONGO.db.event.count()
    if offset >= count:
        return False
    return True


def parse_positive_int(value):
    """ Преобразовать в положительное целое число """
    if value is None:
        raise ErrorDataDB(f"Отсутствует необходимый параметр.")
    if not value.isdigit():
        raise ErrorDataDB(
            f"Получено некорректное значение '{value}'. Должно быть положительное целое число."
        )
    return int(value)
