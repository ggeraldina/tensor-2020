""" Автоинкрементный идентификатор MongoDB """
from bson import ObjectId

from . import MONGO


def get_next_id(collection_name):
    """ Получить следующий идентификатор """
    result = MONGO.db.counter.find_one_and_update(filter={"_id": collection_name},
                                                  update={"$inc": {"count": 1}},
                                                  upsert=True, new=True)
    # ObjectId - 24-character hex string
    return ObjectId(str(result["count"]).zfill(24))
