from flask import Flask, jsonify, request
from flask_cors import CORS

from . import config, database
from .models import db, Users

app = Flask(__name__)
app.url_map.strict_slashes = False
app.config['SQLALCHEMY_DATABASE_URI'] = config.DATABASE_CONNECTION_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.config['CORS_HEADERS'] = 'Content-Type'
app.app_context().push()
CORS(app)

db.init_app(app)
# db.drop_all()
db.create_all()


@app.errorhandler(404)
def resource_not_found(err):
    return jsonify(error=str(err)), 404

@app.errorhandler(500)
def error_500(err):
    return jsonify(error=str(err)), 500

@app.route('/ping', methods=['GET', 'POST'])
def ping():
    return "pong", 200

@app.route('/sign-up', methods=['POST'])
def sign_up():
    new_user = request.get_json()
    name = new_user['name']
    username = new_user['username']

    try:
        database.add_instance(Users, name=name, username=username)
    except Exception as e:
        return f'{e}', 422

    return '', 200

@app.route('/login', methods=['POST'])
def login():
    username = request.args.get('username')
    # return f'{username}', 200
    if not username:
        return 'Missing username', 400
    try:
        user = database.get_instance(Users, username=username)
    except Exception as e:
        return f'{e}', 422

    return f'{user.name}', 200