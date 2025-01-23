from flask_restx import Namespace, Resource, fields
from ..models.contactform import ContactForm

contact_namespace=Namespace("contact", description="Namespace for Contact Form")

contact_model=contact_namespace.model(
    'ContactForm',{
        'id':fields.Integer(description='An ID'),
        'fullname':fields.String(required=True,description='Fullname of the client'),
        'title':fields.String(required=True,description='Title of the message'),
        'email':fields.String(required=True,description='Email of the client'),
        'message':fields.String(required=True,description='Message of the client'),
    }
)

@contact_namespace.route("/contact/")
class ContactFormGetCreate(Resource):
    @contact_namespace.marshal_with(contact_model)
    def get(self):
        return ContactForm.query.all()
