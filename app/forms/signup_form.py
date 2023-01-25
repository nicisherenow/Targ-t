from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


class SignUpForm(FlaskForm):
    firstName = StringField(
        'First name', validators=[DataRequired(message='Please provide a first name')])
    lastName = StringField('Last name', validators=[DataRequired(message='Please provide a last name')])
    password = StringField('password', validators=[DataRequired(message='Please provide a password that is at least 6 characters'), Length(min=4, message='Password must be at least 6 characters')])
    email = StringField('email', validators=[DataRequired(message='Please provide a valid email'), user_exists, Email(message='Please provide a valid email')])
    city = StringField('City', validators=[DataRequired(message='Please provide a city')])
    state = StringField('State', validators=[DataRequired(message='Please provide a state')])
    streetAddress = StringField('Street Address', validators=[DataRequired(message='Please provide a street address')])
    zipcode = IntegerField('zipcode', validators=[DataRequired(message='Please provide a 5 digit zipcode')])
