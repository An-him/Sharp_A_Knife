from flask_restx import Namespace, Resource, fields
from http import HTTPStatus
from ..models.contactform import ContactForm

contact_namespace=Namespace("contact", description="Namespace for Contact Form")

contact_model=contact_namespace.model(
    'ContactForm',{
        'id':fields.Integer(description='An ID'),
        'fullname':fields.String(required=True,description='Fullname of the client'),
        # 'title':fields.String(required=True,description='Title of the message'),
        'email':fields.String(required=True,description='Email of the client'),
        'message':fields.String(required=True,description='Message of the client'),
        'date_created_at':fields.DateTime(required=True, description='Date created'),
    }
)

@contact_namespace.route("/contact/")
class ContactFormGetCreate(Resource):
    @contact_namespace.marshal_with(contact_model)
    def get(self):
        return ContactForm.query.all()
    
    @contact_namespace.expect(contact_model)
    @contact_namespace.marshal_with(contact_model)
    @contact_namespace.doc(description="Send Message")
    def post(self):
        """
            Send a contact form
        """

        # username=get_jwt_identity()
        current_user=None

        # if username:
        #     current_user=User.query.filter_by(username=username).first()
        data=contact_namespace.payload

        
        new_contact=ContactForm(
            email=data['email'],
            fullname=data['fullname'],
            message=data['message'],
            created_at=data['date_created_at'],
        )
        new_contact.client=current_user
    

        new_contact.save()

        return new_contact, HTTPStatus.CREATED
