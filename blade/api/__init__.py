import os
from flask import Flask
from flask_migrate import Migrate
from flask_restx import Api
from .orders.views import order_namespace
from .auth.views import auth_namespace
from .users.views import users_namespace
from .config.config import config_dict
from .utils import db
from .models.orders import Order
from .models.users import User
from .models.blade import Blade
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from werkzeug.exceptions import NotFound, MethodNotAllowed




def create_app(config=config_dict['prod']):

    blade_dir=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    project_root=os.path.dirname(blade_dir)


    static_folder = os.path.join(project_root, 'UI')

    
    app=Flask(__name__, static_folder=static_folder, static_url_path='')
    print(f"Checking index.html at: {os.path.join(app.static_folder, 'index.html')}")
    print(f"App static folder: {app.static_folder}")
    print(f"App static url path: {app.static_url_path}")


    
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
            authorizations=authorizations,
            security='Bearer Auth',
            doc='/docs'
            )

    jwt=JWTManager(app)
    migrate=Migrate(app, db)



    @api.errorhandler(NotFound)
    def not_found(error):
        return {'error':'Not found'},404


    @api.errorhandler(MethodNotAllowed)
    def method_not_allowed(error):
        return {'error':'Method not allowed'},405

    @app.route('/test')
    def test():
        return {'message': 'Test route working'}, 200

    api.add_namespace(order_namespace, path='/orders')
    api.add_namespace(auth_namespace, path='/auth')
    api.add_namespace(users_namespace, path='/users')



    @app.route('/')
    def index():
        try:
            return app.send_from_directory(app.static_folder, 'index.html')
        except Exception as e:
            print(f"Error serving index.html: {str(e)}")
            return {"error": str(e)}, 500


    @app.shell_context_processor
    def make_shell_context():
        return {
            'db':db,
            'User':User,
            'Order':Order,
            'Blade':Blade
        }

    return app  
