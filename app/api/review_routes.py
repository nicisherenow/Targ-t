from flask import Blueprint, jsonify, session, request
from app.models import Review, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_required

review_routes = Blueprint('reviews', __name__)

@review_routes.route('')
def reviews():
  """
  Query for all reviews and returns list of review dictionaries
  """
  reviews = Review.query.all()

  return {'reviews': [review.to_dict() for review in reviews]}

@review_routes.route('/<int:id>')
def review(id):
  """
  Query for a review by id and returns a review dictionary
  """
  review = Review.query.get(id)
  return review.to_dict()
