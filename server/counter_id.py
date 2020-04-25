""" Автоинкрементный идентификатор MongoDB """
from . import MONGO

def get_next_id(collection_name):
    """ Получить следующий идентификатор """
    result = MONGO.db.counter.find_one_and_update(filter={"_id": collection_name},
                                                  update={"$inc": {"count": 1}},
                                                  upsert=True, new=True)
    return result["count"]
