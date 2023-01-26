from flask import Blueprint, jsonify, session, request
from app.models import Review, db, Item
from flask_login import current_user, login_required
from ..forms.reviews_form import ReviewForm
from .auth_routes import validation_errors_to_error_messages

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

@review_routes.route('/<int:id>', methods=['POST'])
@login_required
def write_review(id):
  item = Item.query.get(id)

  if not item:
    return { "errors": ['item does not exist']}

  form = ReviewForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    new_review = Review(
      user_id=current_user.id,
      item_id=item.id,
      review=form.data['review'],
      rating=form.data['rating'],
      title=form.data['title'],
      image_url=form.data['imageUrl'],
    )
    print(new_review)
    db.session.add(new_review)
    db.session.commit()
    return item.to_dict()

  return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@review_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_review(id):
  """
  Update review
  """
  review = Review.query.get(id)
  
  if not review:
    return { "errors": ['review does not exist']}, 404

  form = ReviewForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    review.review=form.data['review'],
    review.rating=form.data['rating'],
    review.title=form.data['title'],
    review.image_url=form.data['imageUrl'],

    print('review-------------------------------', review)
    db.session.add(review)
    db.session.commit()
    return review.to_dict()

  return {'errors': validation_errors_to_error_messages(form.errors)}, 401
