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
        'First name', validators=[DataRequired(message='Please provide a first name'), Length(min=3, max=40, message='First name should be between 3 and 40 characters')])
    lastName = StringField('Last name', validators=[DataRequired(message='Please provide a last name'), Length(min=3, max=40, message='Last name should be between 3 and 40 characters')])
    password = StringField('password', validators=[DataRequired(message='Please provide a password that is at least 6 characters'), Length(min=6, message='Password must be at least 6 characters')])
    email = StringField('email', validators=[DataRequired(message='Please provide a valid email'), user_exists, Email(message='Please provide a valid email'), Length(max=255, message='Email cannot be longer than 255 characters')])
    city = StringField('City', validators=[DataRequired(message='Please provide a city'), Length(min=3, max=50, message='City must be between 3 and 50 characters')])
    state = StringField('State', validators=[DataRequired(message='Please provide a state')])
    streetAddress = StringField('Street Address', validators=[DataRequired(message='Please provide a street address'), Length(min=6, max=100, message='Street address must be at least 6 characters and less than 100')])
    zipcode = IntegerField('zipcode', validators=[DataRequired(message='Please provide a 5 digit zipcode')])
