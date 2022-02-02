import flask_sqlalchemy

db = flask_sqlalchemy.SQLAlchemy()

class Users(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    username = db.Column(db.String(25), nullable=False, unique=True)

