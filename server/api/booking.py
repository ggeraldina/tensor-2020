""" Создание брони """
from bson import ObjectId, errors
from flask import jsonify, request
from pymongo import ReturnDocument
from werkzeug.security import generate_password_hash

from server import APP, MONGO, counter_id
from server.exception.error_data_db import ErrorDataDB


@APP.route("/api/<version>/add_booking", methods=["POST"])
def add_booking(version):
    """ Добавить бронь """
    if version == "v1":
        data = request.get_json()
        if not isinstance(data, dict):
            return jsonify({
                "message": "В запросе должен быть передан словарь. Передан {}".format(type(data)),
                "id": None,
                "is_success": False
            })
        try:
            book_tickets = add_booking_in_tickets(data)
            booking_id = add_doc_booking(data, book_tickets)
        except ErrorDataDB as error_bd:
            return jsonify({"message": error_bd.message, "id": None, "is_success": False})
        return jsonify({"id": booking_id, "is_success": True})
    return jsonify({"message":"Некорректная версия", "id": None, "is_success": False})

def add_booking_in_tickets(data):
    """ Добавить информацию о бронировании в билеты """
    book_tickets = list()
    try:
        for ticket_info_id in data["tickets"]:
            ticket_id = parse_object_id(ticket_info_id["id"], book_tickets)
            before_updating_ticket = add_booking_in_ticket(ticket_id, book_tickets)
            check_relation_event_and_ticket(
                data["event"],
                before_updating_ticket["event"],
                book_tickets
            )
            del before_updating_ticket["event"]
            check_booking_in_ticket(ticket_id, before_updating_ticket["is_booked"], book_tickets)
            del before_updating_ticket["is_booked"]
            book_tickets.append(before_updating_ticket)
    except KeyError as key_error:
        rollback_booking_in_tickets(book_tickets)
        raise ErrorDataDB("Отсутствует ключ {}".format(key_error))
    except TypeError as type_error:
        rollback_booking_in_tickets(book_tickets)
        raise ErrorDataDB("Неверный тип данных; {}".format(type_error))
    return book_tickets

def check_relation_event_and_ticket(event_str_id, ticket_event_id, book_tickets):
    """ Проверить относится ли билет к событию.
    Если не относится, то выбросить исключение """
    if ticket_event_id != parse_object_id(event_str_id, book_tickets):
        rollback_booking_in_tickets(book_tickets)
        raise ErrorDataDB("Билет относится к событию {}, а не {}".format(
            str(ticket_event_id),
            event_str_id
        ))

def check_booking_in_ticket(ticket_id, ticket_is_booked, book_tickets):
    """ Проверить бил ли билет уже забронирован.
    Если да, то выбросить исключение """
    if ticket_is_booked:
        rollback_booking_in_tickets(book_tickets)
        raise ErrorDataDB("Билет {} уже забронирован".format(ticket_id))

def add_booking_in_ticket(ticket_id, book_tickets):
    """ Добавить бронь в билет.
    Возвращает билет со всей информацией до бронирования """
    before_updating_ticket = MONGO.db.ticket.find_one_and_update(
        {"_id": ticket_id},
        {"$set": {"is_booked": True}},
        return_document=ReturnDocument.BEFORE
    )
    if before_updating_ticket is None:
        rollback_booking_in_tickets(book_tickets)
        raise ErrorDataDB("Билет {} не существует".format(ticket_id))
    return before_updating_ticket

def parse_object_id(str_id, book_tickets):
    """ Преобразовать id в ObjectId """
    try:
        return ObjectId(str_id)
    except errors.InvalidId:
        rollback_booking_in_tickets(book_tickets)
        raise ErrorDataDB("Некорректный id: {}".format(str_id))

def rollback_booking_in_tickets(book_tickets):
    """ Отменить брони для уже забронированных билетов,
    т.к. бронирование всех билетов невозможно """
    if book_tickets is None:
        return
    for ticket in book_tickets:
        MONGO.db.ticket.update_one(
            {"_id": ticket["_id"]},
            {"$set": {"is_booked": False}}
        )

def add_doc_booking(data, book_tickets):
    """ Добавить бронь в коллекцию booking """
    try:
        booking = {
            "password_to_cancel": generate_password_hash(data["password_to_cancel"]),
            "phone_number": parse_phone_number(data["phone_number"], book_tickets),
            "event": parse_object_id(data["event"], book_tickets),
            "tickets": book_tickets,
            "_id": counter_id.get_next_id("booking")
        }
    except KeyError as ex:
        rollback_booking_in_tickets(book_tickets)
        raise ErrorDataDB("Отсутствует ключ {}".format(ex))
    return MONGO.db.booking.insert_one(booking).inserted_id

def parse_phone_number(str_phone_number, book_tickets):
    """ Преобразовать номер телефона в int """
    if not str_phone_number.isdigit():
        rollback_booking_in_tickets(book_tickets)
        raise ErrorDataDB(
            ("Некорректный phone_number: {}. Должны быть только цифры").format(str_phone_number)
        )
    return int(str_phone_number)
