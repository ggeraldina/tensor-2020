""" Парсеры """
from bson import ObjectId, errors

from server.exception.error_data_db import ErrorDataDB


def parse_object_id(str_id):
    """ Преобразовать id в ObjectId """
    if str_id is None:
        raise ErrorDataDB("Не передан id")
    if not isinstance(str_id, str):
        raise ErrorDataDB("Переданный id должен иметь строковый тип данных.")
    try:
        return ObjectId(str_id)
    except errors.InvalidId:
        raise ErrorDataDB("Некорректный id: {}".format(str_id))


def parse_phone_number(str_phone_number):
    """ Преобразовать номер телефона в int """
    if str_phone_number is None:
        raise ErrorDataDB("Не передан phone_number")
    if not isinstance(str_phone_number, str):
        raise ErrorDataDB(
            "Переданный phone_number должен иметь строковый тип данных."
        )
    min_len = 4
    if len(str_phone_number) < min_len:
        raise ErrorDataDB(
            ("Очень короткий номер телефона: {}. Хотя бы {} цифры").format(
                str_phone_number,
                min_len
            )
        )
    if not str_phone_number.isdigit():
        raise ErrorDataDB(
            ("Некорректный phone_number: {}. Должны быть только цифры").format(
                str_phone_number
            )
        )
    return int(str_phone_number)
