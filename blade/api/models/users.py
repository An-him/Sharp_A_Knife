from ..utils import db
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

class User(db.Model):

    __tablename__ = 'users'

    id=db.Column(db.Integer(), primary_key=True)
    fullname=db.Column(db.String(255),nullable=False)
    email=db.Column(db.String(255),nullable=False,unique=True)
    password=db.Column(db.Text(),nullable=False)


    def __repr__(self):
          return f"<User {self.fullname}>"


    def save_user(self):
              
            db.session.add(self)
            db.session.commit()


    @classmethod
    def get_by_id(cls,id):
          return cls.query.get_or_404(id)