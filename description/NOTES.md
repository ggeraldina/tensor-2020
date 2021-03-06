## Ветки

* master

* develop - для разработки

#  Heroku

https://tensor-2020.herokuapp.com/ - боевой сайт (master)

https://tensor-2020-test.herokuapp.com/ - тестовая версия (develop)

# Flask

https://flask.palletsprojects.com/en/1.1.x/

---

## Начальная настройка

* Создание виртуальной среды
`python -m venv venv`

    Первым venv в команде является имя пакета виртуальной среды Python, а второе — имя виртуальной среды.

* Активация виртуальной среды
В Windows: `venv\Scripts\activate`

* Установка зависимостей
`pip install -r requirements.txt`

## Запуск

 *`FLASK_APP` можно не настраивать, т.к. по умолчанию ищется app.py в корне проекта, а он у нас есть :). Если все же нужно это сделать, то в Windows: `set FLASK_APP=app.py`*

* `flask run` - запуск (Вот там будет: http://127.0.0.1:5000/)

* Остановка: `Ctrl+C`

*Eсли вы хотите запустить сервер разработки на другой IP-адрес или порт, используйте аргументы командной строки узла и порта, как `--host=0.0.0.0 --port=8080`*

## Отладка

Сценарий flask хорош для запуска локального сервера разработки, но вам придется перезапускать его вручную после каждого изменения кода. Это не очень приятно, и flask может сделать лучше. Если вы включите поддержку отладки, сервер перезагрузится при изменении кода, а также предоставит вам полезный отладчик, если что-то пойдет не так. 

Чтобы включить все функции разработки (включая режим отладки), можно экспортировать переменную среды `FLASK_ENV` и установить ее в значение development перед запуском сервера:

- В Windows: `set FLASK_ENV=development`
- В Heroku: `heroku config:set FLASK_ENV=development`

Переменная среды `FLASK_ENV` имеет значение по умолчанию `production`

- В Windows: `set FLASK_ENV=production`
- В Heroku: `heroku config:set FLASK_ENV=production`

## VS Code

Для VS Code pylint, запуск с отладкой/без по нажатию одной кнопочки уже настроены. Загляните в папку `.vscode`. Можно забыть о предыдущих двух пунктах :Р.

## Переменные среды

* Вы можете создать файл .env со всеми переменными среды, которые необходимы вашему приложению. Важно, чтобы вы не добавляли ваш .env-файл в систему управления версиями. Не стоит иметь файл, содержащий пароли и другую конфиденциальную информацию, включенный в репозиторий исходного кода.

    Например, там можно и нужно хранить MONGO_URI, SECRET_KEY, NETLOC..

* .env-файл можно использовать для всех переменных временной конфигурации, но его нельзя использовать для переменных среды `FLASK_APP` и `FLASK_DEBUG`, так как они необходимы уже в процессе начальной загрузки приложения, до того, как экземпляр приложения и его объект конфигурации появится.

    *Еще есть .flaskenv, если в нем настроить `FLASK_APP=app.py` и `FLASK_ENV=development`, то все работает, как надо. Но не факт, что так делать правильно.*

---

# MongoDB

Нужно выбрать библиотеку:

* Flask-PyMongo - https://flask-pymongo.readthedocs.io/en/latest/ - прямые запросы к БД.
* Flask-MongoAlchemy - https://pythonhosted.org/Flask-MongoAlchemy/ - работа с БД через классы.
* Flask-MongoEngine - http://docs.mongoengine.org/projects/flask-mongoengine/en/latest/ - работа с БД через классы.

# MongoDB и Flask-PyMongo

MongoDB - https://docs.mongodb.com/manual/introduction/

Flask-PyMongo - https://flask-pymongo.readthedocs.io/en/latest/

PyMongo - https://api.mongodb.com/python/current/tutorial.html

Для работы с установленной на компьютер mongoDB нужно добавить в папку проекта `.env` с строкой
    
`MONGO_URI="mongodb://localhost:27017/theaterDB"`

где `theaterDB` - имя БД.


---

# Работа с проектом в VS Code

Установить Python ≥3.7

Создать в корне проекта **.env** с переменной окружения MONGO_URI:

`MONGO_URI="mongodb+srv://UserMongo:ПАРОЛЬ@clustermongodb-pxklu.mongodb.net/theaterDBdev?retryWrites=true&w=majority"`, где ПАРОЛЬ - это ваш пароль :)

В корне проекта:

`python -m venv venv` // Создание виртуальной среды

`venv\Scripts\activate` // Активация виртуальной среды в Windows

`pip install -r requirements.txt` // Установка Python зависимостей приложения

`cd client`

В client:

`npm install`  // Установка JavaScript зависимостей

`npm run-script build`  // Создание build для prodaction

Потом в VS Code жмякнуть на кнопочку ► Development в секции Run

Приложение будет на http://127.0.0.1:5000/

При каждом изменении на frontend будет нужно заново создавать папку build

package.json в корне проекта предназначен для heroku

