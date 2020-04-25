""" Список мероприятий для главной страницы """
from flask import jsonify, request

from server import APP, MONGO


@APP.route("/api/<version>/get_list_events", methods=["GET"])
def get_list_events(version):
    """ Получить список мероприятий """
    if version == "v1":
        skip = int(request.args.get("offset"))
        limit = int(request.args.get("limit"))
        cursor = MONGO.db.event.find({},
                                     {"_id": 1,
                                      "title": 1,
                                      "photo": 1,
                                      "start_time": 1}).sort("start_time").skip(skip).limit(limit)
        events = list(cursor)
        return jsonify({"list_events": events})
    return jsonify({"message":"Некорректная версия", "list_events": []})
