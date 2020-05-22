""" Список броней """
from flask import jsonify, request

from server import APP, MONGO
from server.utils.parsers import parse_phone_number, parse_object_id
from server.exception.error_data_db import ErrorDataDB


@APP.route("/api/<version>/get_bookings_list", methods=["GET"])
def get_bookings_list(version):
    """ Получить список броней """
    if version != "v1":
        return jsonify({"message": "Некорректная версия", "bookings": []})
    try:
        phone_number = parse_phone_number(request.args.get("phone_number"))
    except ErrorDataDB as error_db:
        return jsonify({"message": error_db.message, "bookings": []})
    cursor = MONGO.db.booking.find(
        {"phone_number": phone_number},
        {
            "phone_number": 0,
            "password_to_cancel": 0
        }
    )
    bookings = list(cursor)
    for booking in bookings:
        booking["id"] = booking.pop("_id")
        booking["event"] = get_event_info(
            parse_object_id(booking.pop("event")))
        for ticket in booking["tickets"]:
            ticket["id"] = ticket.pop("_id")
    return jsonify({"bookings": bookings})


def get_event_info(event_id):
    """ Получить информацию о забронированном мероприятии """
    event = MONGO.db.event.find_one(
        {"_id": event_id},
        {
            "_id": 1,
            "title": 1,
            "start_time": 1
        }
    )
    event["id"] = event.pop("_id")
    return event
