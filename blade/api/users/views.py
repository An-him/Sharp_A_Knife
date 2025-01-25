from ..models.users import User
from flask_restx import Resource,Namespace,fields
from ..models.users import User
from ..utils import db


users_namespace=Namespace("users", description="namespace for User operations")

user_model=users_namespace.model(
    'User',{
        'id':fields.Integer(description='An ID'),
        'fullname':fields.String(description='Fullname'),
        'email':fields.String(description='Email'),
        'password':fields.String(description='Password'),
        'is_staff':fields.Boolean(description='Staff status'),
        'is_active':fields.Boolean(description='Active status'),
        'date_created':fields.DateTime(description='Date Created')
    }
)

@users_namespace.route("/users/")
class UserResource(Resource):
    """
        Create a new user
    """
    @users_namespace.expect(user_model)
    @users_namespace.marshal_with(user_model)
    def get(self):
        """
            Get all users
        """
        users=User.query.all()
        return users

@users_namespace.route("/users/<int:id>")
class UserDeleteUpdate(Resource):
    """
        Update and delete a user
    """

    @users_namespace.expect(user_model)
    @users_namespace.marshal_with(user_model)
    def put(self,id):
        """
            Update a user
        """
        user=User.query.get_or_404(id)
        data=request.get_json()
        user.fullname=data.get('fullname')
        user.email=data.get('email')
        user.password=data.get('password')
        user.is_staff=data.get('is_staff')
        user.is_active=data.get('is_active')
        db.session.commit()
        return user

    def delete(self,id):
        """
            Delete a user
        """
        user=User.query.get_or_404(id)
        db.session.delete(user)
        db.session.commit()
        return {"message":"User deleted successfully"}