from functools import wraps
from flask_jwt_extended import get_current_user

def auth_role():
    def wrapper(fn):
        @wraps(fn)
        def decorato(*args, **kwargs):
            current_user = get_current_user()