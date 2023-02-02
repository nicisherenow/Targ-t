from flask_wtf import FlaskForm
from wtforms import StringField, TextField, IntegerField
from wtforms.validators import DataRequired, Length, ValidationError

def is_image_url(form, field):
  imageUrl = field.data
  if not imageUrl.startswith(('http://', 'https://',)):
    raise ValidationError('Image URL must start with http:// or https://')
  if not imageUrl.endswith(('.jpg', '.jpeg', '.png', '.svg', '.img',)):
    raise ValidationError('Image URL must end with .jpg, .jpeg, .png, .svg, or .img')

class ReviewForm(FlaskForm):
  title = StringField('title', validators=[DataRequired(message='Please provide a title'), Length(min=3, max=100, message='Title must be at least 3 characters')])
  review = TextField('review', validators=[DataRequired(message='Please provide a review'), Length(min=3, message='Review must be at least 3 characters')])
  rating = IntegerField('rating', validators=[DataRequired()])
  imageUrl = TextField('imageUrl', validators=[DataRequired(False), is_image_url])
