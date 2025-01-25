from flask_sqlalchemy import SQLAlchemy
from ..utils import db
from datetime import datetime



class ContactForm(db.Model):
    __tablename__ = 'contactform'
    id=db.Column(db.Integer(), primary_key=True)
    fullname=db.Column(db.String(255), nullable=False)
    title=db.Column(db.String(255), nullable=False)
    email=db.Column(db.String(255), nullable=False)
    message=db.Column(db.String(255), nullable=False)
    date_created_at=db.Column(db.DateTime(),default=datetime.utcnow)

    def __init__(self,fullname,title,email,message):
        self.fullname=fullname
        self.title=title
        self.email=email
        self.message=message

    def __repr__(self):
        return f'<ContactForm {self.title}>'
    
    def save(self):
        db.session.add(self)
        db.session.commit()


    @classmethod
    def get_by_id(cls,id):
        return cls.query.get_or_404(id)

    def delete(self):
        db.session.delete(self)
        db.session.commit()