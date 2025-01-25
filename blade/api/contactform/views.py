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
    def post(self):
        data=contact_namespace.payload
        
        contact = ContactForm(
            fullname=data['fullname'],
            title=data['title'],
            email=data['email'],
            message=data['message']
        )

        contact.save()
        return contact