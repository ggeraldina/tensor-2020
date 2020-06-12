""" Парсеры """
from bson import ObjectId, errors

from server.exception.error_data_db import ErrorDataDB


def parse_object_id(str_id):
    """ Преобразовать id в ObjectId """
    try:
        return ObjectId(str_id)
    except errors.InvalidId:
        raise ErrorDataDB("Некорректный id: {}".format(str_id))


def parse_phone_number(str_phone_number):
    """ Преобразовать номер телефона в int """
    if not isinstance(str_phone_number, str):
        raise ErrorDataDB(
            ("Переданный phone_number должен иметь строковый тип данных. Передан {}").format(
                type(str_phone_number)
            )
        )
    if len(str_phone_number) < 4:
        raise ErrorDataDB(
            ("Очень короткий номер телефона: {}. Хотя бы 4 цифры").format(
                str_phone_number
            )
        )
    if not str_phone_number.isdigit():
        raise ErrorDataDB(
            ("Некорректный phone_number: {}. Должны быть только цифры").format(
                str_phone_number
            )
        )
    return int(str_phone_number)
