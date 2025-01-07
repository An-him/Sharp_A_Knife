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
    street=db.Column(db.String(255), nullable=False)
    appartment_name=db.Column(db.String(255), nullable=False)
    block=db.Column(db.String(255), nullable=True)
    House_number=db.Column(db.String(255), nullable=False)
    phone_number=db.Column(db.String(255), nullable=False)
    quantity=db.Column(db.Integer(), nullable=False)
    order_status=db.Column(db.Enum(OrderStatus),default=OrderStatus.BLUNT)
    quantity=db.Column(db.Integer(),default=3,nullable=False)
    date_created_at=db.Column(db.DateTime(),default=datetime.utcnow)
    user_id=db.Column(db.Integer(), db.ForeignKey('users.id'))

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

