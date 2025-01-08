from ..utils import db
from enum import Enum
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

class Customer(Base):
    __tablename__ = 'customers'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    phone_number = Column(String, unique=True, nullable=True)
    address = Column(String, nullable=True)

    def __repr__(self):
        return f"<Customer {self.first_name} {self.last_name}>"
    
    def save(self):
        session.add(self)
        session.commit()

    def delete(self):
        session.delete(self)
        session.commit()