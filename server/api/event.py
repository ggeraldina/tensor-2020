""" Список мероприятий для главной страницы """
from flask import jsonify, request

from server import APP, MONGO
from server.exception.error_data_db import ErrorDataDB
from server.utils.parsers import parse_object_id


@APP.route("/api/<version>/get_event", methods=["GET"])
def get_event(version):
    """ Получить список мероприятий """
    if version != "v1":
        return jsonify({"message": "Некорректная версия", "event": {}, "tickets": []})
    try:
        event_id = parse_object_id(request.args.get("id"))
    except ErrorDataDB as error_db:
        return jsonify({"message": error_db.message, "event": {}, "tickets": []})
    event = MONGO.db.event.find_one_or_404({"_id": event_id})
    tickets = list(MONGO.db.ticket.find({"event": event_id}, {"event": 0}))
    event["id"] = event.pop("_id")
    for ticket in tickets:
        ticket["id"] = ticket.pop("_id")
    return jsonify({"event": event, "tickets": tickets})
