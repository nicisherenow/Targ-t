from flask_wtf import FlaskForm
from wtforms import StringField, TextField, IntegerField
from wtforms.validators import DataRequired, Length

class ReviewForm(FlaskForm):
  title = StringField('title', validators=[DataRequired(message='Please provide a title'), Length(min=3, message='Title must be at least 3 characters')])
  review = TextField('review', validators=[DataRequired(message='Please provide a review'), Length(min=3, message='Review must be at least 3 characters')])
  rating = IntegerField('rating', validators=[DataRequired()])
  imageUrl = TextField('imageUrl')
