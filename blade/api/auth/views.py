from http import HTTPStatus
from flask_restx import Namespace,Resource, fields
from flask import request,jsonify
from ..models.users import User
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import(create_access_token,
create_refresh_token,jwt_required,get_jwt_identity)
from werkzeug.exceptions import Conflict,BadRequest


auth_namespace=Namespace('auth', description="namespace for all authentication")

signUp_model=auth_namespace.model(
    'SignUp',{
        'id':fields.Integer(),
        'username':fields.String(required=True, description="A Username"),
        'email':fields.String(required=True, description="An Email Address"),
        'password_hash':fields.String(required=True, description="A Password"),
    }
)

user_model=auth_namespace.model(
    'User',{
        'id':fields.Integer(),
        'username':fields.String(required=True, description="A Username"),
        'email':fields.String(required=True, description="An Email Address"),
        'password_hash':fields.String(required=True, description="A Password"),
        'is_staff':fields.Boolean(description="Shows User Is Staff"),
        'is_active':fields.Boolean(description="Shows User Active"),
    }
)


login_model=auth_namespace.model(
    'Login',{
        'email':fields.String(required=True, description="An Email Address"),
        'password':fields.String(required=True, description="A Password"),
    }
)


@auth_namespace.route('/signup')
class SignUp(Resource):

    @auth_namespace.expect(signUp_model)
    @auth_namespace.marshal_with(user_model)
    def post(self):
        """
        Create a new User account
        """
        data = request.get_json()
        
        try:

            new_user=User(
                username=data.get('username'),
                email=data.get('email'),
                password_hash=generate_password_hash(data.get('password')),
            )
            new_user.save_user()

            return new_user, HTTPStatus.CREATED
        
        except Exception as e:
            raise Conflict(f"User with email {data.get('email')} exists") from e





@auth_namespace.route('/login')
class Login(Resource):


    @auth_namespace.expect(login_model)
    def post(self):
        """
        Generate JWT Pair
        """
        data=request.get_json()


        email=data.get('email')
        password=data.get('password')

        user=User.query.filter_by(email=email).first()



        if (user is not None) and check_password_hash(user.password_hash,password):

            access_token=create_access_token(identity=user.username)
            refresh_token=create_refresh_token(identity=user.username)

            response={
                'access_token':access_token,
                'refresh_token':refresh_token
            }


            return response, HTTPStatus.OK
        
        raise BadRequest("Invalid Username or Password")
        
    

@auth_namespace.route('/refresh')
class Refresh(Resource):

    @jwt_required(refresh=True)
    def post(self):
        """
        Generate New Access Token
        """
        username=get_jwt_identity()

        return{"username":username}