from flask_wtf import FlaskForm
from wtforms import StringField, TextField
from wtforms.validators import DataRequired, ValidationError
from app.models import User

class ReviewForm(FlaskForm):
  
