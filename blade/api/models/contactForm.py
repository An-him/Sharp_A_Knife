from ..utils import db
from flask_sqlalchemy import SQLAlchemy

class ContactForm(db.Model):
    __tablename__ = 'contact_form'
    id=db.Column(db.Integer(), primary_key=True)
    fullname=db.Column(db.String(255), nullable=False)
    email=db.Column(db.String(255), nullable=False)
    message=db.Column(db.String(255), nullable=False)
#    submitted_at = db.Column(db.DateTime, server_default=db.func.now())

    def __repr__(self):
        return f'<ContactForm {self.id}>'
    
    def save(self):
        db.session.add(self)
        db.session.commit()


    @classmethod
    def get_by_id(cls,id):
        return cls.query.get_or_404(id)

    def delete(self):
        db.session.delete(self)
        db.session.commit()