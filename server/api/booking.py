""" Бронь """
from flask import jsonify, request
from pymongo import ReturnDocument
from werkzeug.security import check_password_hash, generate_password_hash

from server import APP, MONGO
from server.db import counter_id
from server.exception.error_data_db import ErrorDataDB
from server.utils.parsers import parse_object_id, parse_phone_number
from server.utils.transaction import (commit_with_retry,
                                      run_transaction_with_retry)

# -----------------------------------------------------------
# Добавление брони
# -----------------------------------------------------------


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


def check_request_dict(data):
    """ Проверить тип входных данных. Должен быть передан словарь """
    if not isinstance(data, dict):
        raise ErrorDataDB(
            "В запросе должен быть передан словарь. Передан {}".format(
                type(data))
        )


@run_transaction_with_retry
def txn_add_booking(session, data):
    """ Добавить бронь и информацию о ней в билеты """
    check_password_to_cancel(data["password_to_cancel"])
    book_tickets = add_booking_in_tickets(data, session)
    booking_id = add_doc_booking(data, book_tickets, session)
    commit_with_retry(session)
    return booking_id


def check_password_to_cancel(str_password_to_cancel):
    """ Проверить пароль на надежность """
    if not isinstance(str_password_to_cancel, str):
        raise ErrorDataDB(
            ("Переданный password_to_cancel должен иметь строковый тип данных. Передан {}").format(
                type(str_password_to_cancel)
            )
        )
    if len(str_password_to_cancel) < 9:
        raise ErrorDataDB(
            ("Очень короткий password_to_cancel: {}. Хотя бы 8 символов").format(
                str_password_to_cancel
            )
        )
    return True


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


# -----------------------------------------------------------
# Отмена брони
# -----------------------------------------------------------

@APP.route("/api/<version>/cancel_booking", methods=["POST"])
def cancel_booking(version):
    """ Отменить бронь """
    if version != "v1":
        return jsonify({"message": "Некорректная версия", "is_success": False})
    try:
        data = request.get_json()
        booking_id, phone_number, password_to_cancel = parse_data(data)
        check_password(booking_id, phone_number, password_to_cancel)
        with MONGO.cx.start_session() as session:
            txn_cancel_booking(session, booking_id)
    except ErrorDataDB as error_db:
        return jsonify({"message": error_db.message, "is_success": False})
    return jsonify({"is_success": True})


def parse_data(data):
    """ Распарсить полученные данные """
    try:
        check_request_dict(data)
        booking_id = parse_object_id(data["id"])
        phone_number = parse_phone_number(data["phone_number"])
        password_to_cancel = data["password_to_cancel"]
    except KeyError as key_error:
        raise ErrorDataDB("Отсутствует ключ {}".format(key_error))
    return booking_id, phone_number, password_to_cancel


def check_password(booking_id, phone_number, password_to_cancel):
    """ Проверить пароль"""
    try:
        password_hash = MONGO.db.booking.find_one(
            {"_id": booking_id, "phone_number": phone_number},
            {"password_to_cancel": 1}
        )["password_to_cancel"]
    except TypeError:
        raise ErrorDataDB("Нет брони {} у номера {}".format(
            booking_id, phone_number))
    if not check_password_hash(password_hash, password_to_cancel):
        raise ErrorDataDB("Неверный пароль")


@run_transaction_with_retry
def txn_cancel_booking(session, booking_id):
    """ Удалить бронь и разбронировать билеты """
    tickets = MONGO.db.booking.find_one(
        {"_id": booking_id}, {"tickets._id": 1})["tickets"]
    for ticket in tickets:
        cancel_booking_in_ticket(ticket["_id"], session)
    MONGO.db.booking.delete_one({"_id": booking_id})
    commit_with_retry(session)
    return True


def cancel_booking_in_ticket(ticket_id, session):
    """ Удалить бронь из билета.
    Возвращает билет со всей информацией до бронирования """
    before_updating_ticket = MONGO.db.ticket.find_one_and_update(
        {"_id": ticket_id},
        {"$set": {"is_booked": False}},
        return_document=ReturnDocument.BEFORE,
        session=session
    )
    if before_updating_ticket is None:
        raise ErrorDataDB("Билет {} не существует".format(ticket_id))
