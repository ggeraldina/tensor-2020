""" Создание брони """
from bson import ObjectId

from flask import jsonify, request

from werkzeug.security import generate_password_hash

from server import APP, MONGO, counter_id

@APP.route("/api/<version>/add_booking", methods=["POST"])
def add_booking(version):
    """ Добавить бронь """
    data = request.get_json()
    print(data, type(data))
    if version == "v1":
        add_booking_for_tickets(data)
        booking_id = add_doc_booking(data)
        return jsonify({"id": booking_id, "is_success": True})
    return jsonify({"message":"Некорректная версия", "id": None, "is_success": False})

def add_booking_for_tickets(data):
    """ Добавить информацию о бронировании в билеты """
    for ticket in data["tickets"]:
        print(ticket["id"])
        result = MONGO.db.ticket.update_one({"_id": ObjectId(ticket["id"])},
                                            {"$set": {"is_booked": True}})
        print(result.matched_count)
        print(result.modified_count)

def add_doc_booking(data):
    """ Добавить бронь в коллекцию booking """
    booking = {"_id": counter_id.get_next_id("booking"),
               "password_to_cancel": generate_password_hash(data["password_to_cancel"]),
               "phone_number": int(data["phone_number"]),
               "event": ObjectId(data["event"]),
               "tickets": data["tickets"]}
    return MONGO.db.booking.insert_one(booking).inserted_id
