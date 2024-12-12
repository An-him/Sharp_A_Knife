from flask_restx import Namespace,Resource, fields
from http import HTTPStatus
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models.orders import Order
from ..models.users import User



order_namespace=Namespace("orders", description="Namespace for Orders")

order_model=order_namespace.model(
    'Order',{
        'id':fields.Integer(description='An ID'),
        'quantity':fields.Integer(required=True,description='Quantity of the order'),
        'service':fields.String(required=True,description='Service to be provided'),
        'order_status':fields.String(description='Status of the order',required=True,
            enum=['BLUNT','WHETTING','SHARPENING','SHARP']),
    }
)

order_status_model=order_namespace.model(
    'OrderStatus',{
        'order_status':fields.String(description='Status of the order',
            enum=['BLUNT','WHETTING','SHARPENING','SHARP']),
    }
)
@order_namespace.route("/orders/")
class OrderGetCreate(Resource):


    @order_namespace.marshal_with(order_model)
    @jwt_required()
    def get(self):
        """
        Get all orders
        """
        orders=Order.query.all()
        return orders, HTTPStatus.OK

    @order_namespace.expect(order_model)
    @order_namespace.marshal_with(order_model)
    @jwt_required()
    def post(self):
        """
            Place a new order
        """

        username=get_jwt_identity()

        current_user=User.query.filter_by(username=username).first()
        data=order_namespace.payload

        new_order=Order(
            quantity=data['quantity'],
        )
        new_order.client=current_user
    

        new_order.save()

        return new_order, HTTPStatus.CREATED

@order_namespace.route("/orders/<int:order_id>")
class GetUpdateDeleteOrder(Resource):

    @order_namespace.marshal_with(order_model)
    @jwt_required()
    def get(self,order_id):
        """
            Retrieves an order by id
        """
        order=Order.get_by_id(order_id)


        return order, HTTPStatus.OK

    def put(self,order_id):
        """
            Update an order by id
        """
        pass

    def delete(self,order_id):
        """
            Delete an order by id
        """
        pass


@order_namespace.route("/user/<int:user_id>/order/<int:order_id>/")
class GetSpecificOrder(Resource):

    def get(self,user_id,order_id):
        """
            Get all Orders by specific users
        """
        pass



@order_namespace.route("/user/<int:user_id>/orders")
class UserOrders(Resource):


    @order_namespace.marshal_list_with(order_model)
    @jwt_required()
    def get(self,user_id):
        """
            Gets all orders of a Specified user
        """
        user=User.get_by_id(user_id)

        orders=user.orders

        return orders, HTTPStatus.OK

@order_namespace.route("/orders/status/<int:order_id>")
class UpdateOrderStatus(Resource):
    def patch(self, order_id):
        """
            Update order's status
        """
        pass