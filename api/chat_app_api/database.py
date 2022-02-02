from .models import db

def get_all(model):
    data = model.query.all()
    return data

def add_instance(model, **kwargs):
    instance = model(**kwargs)
    db.session.add(instance)
    db.session.commit()

def get_instance(model, **kwargs):
    data = model.query.filter_by(**kwargs).all()[0]

    return data


