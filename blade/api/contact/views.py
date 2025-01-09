from flask_restx import Namespace, fields, Resource
from http import HTTPStatus
from ..models.contactForm import ContactForm

contact_namespace=Namespace("contact", description="Namespace for Contact Form")

contactForm_model=contact_namespace.model(
    "Contact",{
    "id":fields.Integer(readOnly=True),
    "fullname":fields.String(required=True, description="Full Name"),
    "email":fields.String(required=True, description="Email Address"),
    "message":fields.String(required=True, description="Message")
})

@contact_namespace.route("/contactform")
class ContactResource(Resource):


    @contact_namespace.expect(contactForm_model)
    @contact_namespace.marshal_with(contactForm_model)
    def post(self):
        data=contact_namespace.payload
        new_contact=ContactForm(
            fullname=data['fullname'],
            email=data['email'],
            message=data['message']
        )
        new_contact.save()
        return new_contact, HTTPStatus.CREATED
    
    @contact_namespace.marshal_with(contactForm_model)
    def get(self):
        return ContactForm.query.all(), HTTPStatus.OK