from ..utils import db
from enum import Enum
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy


class OrderStatus(Enum):
    BLUNT='BLUNT'
    WHETTING='WHETTING'
    SHARPENING='SHARPENING'
    SHARP='SHARP'

class Service(Enum):
    REPAIR='REPAIR'
    WHETTING='WHETTING'

class Order(db.Model):
    __tablename__ = 'orders'
    id=db.Column(db.Integer(), primary_key=True)
    fullname=db.Column(db.String(255), nullable=False)
    email=db.Column(db.String(255), nullable=False)
    address=db.Column(db.String(255), nullable=False)
    House_number=db.Column(db.String(4), nullable=False)
    phone_number=db.Column(db.String(13), nullable=False)
    quantity=db.Column(db.Integer(), nullable=False)
    total=db.Column(db.Float(), nullable=True)
    date_created_at=db.Column(db.DateTime(),default=datetime.utcnow)

    def __init__(self,fullname,email,address,House_number,phone_number,quantity,total):
        self.fullname=fullname
        self.email=email
        self.address=address
        self.House_number=House_number
        self.phone_number=phone_number
        self.quantity=quantity
        self.total=total

    def __repr__(self):
        return f'<Order {self.id}>'
    
    def save(self):
        db.session.add(self)
        db.session.commit()


    @classmethod
    def get_by_id(cls,id):
        return cls.query.get_or_404(id)

    def delete(self):
        db.session.delete(self)
        db.session.commit()

