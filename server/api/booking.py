""" Создание брони """
from bson import ObjectId, errors
from flask import jsonify, request
from pymongo import ReturnDocument

from werkzeug.security import generate_password_hash

from server import APP, MONGO, counter_id
from server.exception.error_data_db import ErrorDataDB
from server.transaction import run_transaction_with_retry, commit_with_retry


@APP.route("/api/<version>/add_booking", methods=["POST"])
def add_booking(version):
    """ Добавить бронь """
    if version != "v1":
        return jsonify({"message": "Некорректная версия", "id": None, "is_success": False})
    try:
        data = request.get_json()
        check_request_dict(data)
        with MONGO.cx.start_session() as session:
            booking_id = txn_add_booking(session, data)
    except ErrorDataDB as error_db:
        return jsonify({"message": error_db.message, "id": None, "is_success": False})
    return jsonify({"id": booking_id, "is_success": True})


@run_transaction_with_retry
def txn_add_booking(session, data):
    """ Добавить бронь и информацию о ней в билеты """
    book_tickets = add_booking_in_tickets(data, session)
    booking_id = add_doc_booking(data, book_tickets, session)
    commit_with_retry(session)
    return booking_id


def check_request_dict(data):
    """ Проверить тип входных данных. Должен быть передан словарь """
    if not isinstance(data, dict):
        raise ErrorDataDB(
            "В запросе должен быть передан словарь. Передан {}".format(type(data))
        )


def add_booking_in_tickets(data, session):
    """ Добавить информацию о бронировании в билеты """
    book_tickets = list()
    try:
        for ticket_info_id in data["tickets"]:
            ticket_id = parse_object_id(ticket_info_id["id"])
            before_updating_ticket = add_booking_in_ticket(ticket_id, session)
            check_relation_event_and_ticket(
                data["event"],
                before_updating_ticket["event"]
            )
            del before_updating_ticket["event"]
            check_booking_in_ticket(
                ticket_id, before_updating_ticket["is_booked"]
            )
            del before_updating_ticket["is_booked"]
            book_tickets.append(before_updating_ticket)
    except KeyError as key_error:
        raise ErrorDataDB("Отсутствует ключ {}".format(key_error))
    except TypeError as type_error:
        raise ErrorDataDB("Неверный тип данных; {}".format(type_error))
    return book_tickets


def check_relation_event_and_ticket(event_str_id, ticket_event_id):
    """ Проверить относится ли билет к событию.
    Если не относится, то выбросить исключение """
    if ticket_event_id != parse_object_id(event_str_id):
        raise ErrorDataDB("Билет относится к событию {}, а не {}".format(
            str(ticket_event_id),
            event_str_id
        ))


def check_booking_in_ticket(ticket_id, ticket_is_booked):
    """ Проверить был ли билет уже забронирован.
    Если да, то выбросить исключение """
    if ticket_is_booked:
        raise ErrorDataDB("Билет {} уже забронирован".format(ticket_id))


def add_booking_in_ticket(ticket_id, session):
    """ Добавить бронь в билет.
    Возвращает билет со всей информацией до бронирования """
    before_updating_ticket = MONGO.db.ticket.find_one_and_update(
        {"_id": ticket_id},
        {"$set": {"is_booked": True}},
        return_document=ReturnDocument.BEFORE,
        session=session
    )
    if before_updating_ticket is None:
        raise ErrorDataDB("Билет {} не существует".format(ticket_id))
    return before_updating_ticket


def parse_object_id(str_id):
    """ Преобразовать id в ObjectId """
    try:
        return ObjectId(str_id)
    except errors.InvalidId:
        raise ErrorDataDB("Некорректный id: {}".format(str_id))


def add_doc_booking(data, book_tickets, session):
    """ Добавить бронь в коллекцию booking """
    try:
        booking = {
            "password_to_cancel": generate_password_hash(data["password_to_cancel"]),
            "phone_number": parse_phone_number(data["phone_number"]),
            "event": parse_object_id(data["event"]),
            "tickets": book_tickets,
            "_id": counter_id.get_next_id("booking", session)
        }
    except KeyError as ex:
        raise ErrorDataDB("Отсутствует ключ {}".format(ex))
    return MONGO.db.booking.insert_one(booking, session=session).inserted_id


def parse_phone_number(str_phone_number):
    """ Преобразовать номер телефона в int """
    if not str_phone_number.isdigit():
        raise ErrorDataDB(
            ("Некорректный phone_number: {}. Должны быть только цифры").format(str_phone_number)
        )
    return int(str_phone_number)
