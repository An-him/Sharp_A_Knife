import os
from flask import Flask
from flask_migrate import Migrate
from flask_restx import Api
from .orders.views import order_namespace
from .auth.views import auth_namespace
from .users.views import users_namespace
from .contactform.views import contact_namespace
from .config.config import config_dict
from .utils import db
from .models.orders import Order
from .models.users import User
from .models.contactform import ContactForm
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from werkzeug.exceptions import NotFound, MethodNotAllowed




def create_app(config=config_dict['prod']):
    """
        Create a Flask app using the app factory pattern
    """


    app=Flask(__name__)


    
    CORS(app)



    app.config.from_object(config)

    db.init_app(app)

    

    authorizations={
        "Bearer Auth":{
            'type':'apiKey',
            'in':'header',
            'name':'Authorization',
            'description':'Add a JWT Authorization ** Bearer &lt;JWT&gt; to authoirize'
        }
    }

    api=Api(app,
            title='SharpAKnife API',
            description='REST API for Kitchen Blade Services',
            authorizations='authorizations',
            security='Bearer Auth',
            version='1.0',
            )

    jwt=JWTManager(app)
    migrate=Migrate(app, db)



    @api.errorhandler(NotFound)
    def not_found(error):
        return {'error':'Not found'},404


    @api.errorhandler(MethodNotAllowed)
    def method_not_allowed(error):
        return {'error':'Method not allowed'},405


    api.add_namespace(order_namespace, path='/orders')
    api.add_namespace(auth_namespace, path='/auth')
    api.add_namespace(contact_namespace, path='/contact')
    api.add_namespace(users_namespace, path='/users')




    @app.shell_context_processor
    def make_shell_context():
        return {
            'db':db,
            'User':User,
            'Order':Order,
            'Contact':Contact,
        }

    return app  
