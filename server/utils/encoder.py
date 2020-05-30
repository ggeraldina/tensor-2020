""" BSON типы ObjectId и Timestamp превращаем в строки при использовании jsonify. """
from datetime import date, datetime

from bson import ObjectId
from flask.json import JSONEncoder


class MongoJSONEncoder(JSONEncoder):
    """ Собственый JSONEncoder """
    # pylint: disable=method-hidden
    def default(self, o):
        if isinstance(o, (datetime, date)):
            return datetime.isoformat(o)
        if isinstance(o, ObjectId):
            return str(o)
        return super().default(o)
