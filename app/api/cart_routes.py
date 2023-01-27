from flask import Blueprint, jsonify, session, request
from app.models import Cart, db, Item
from flask_login import current_user, login_required
from .auth_routes import validation_errors_to_error_messages

cart_routes = Blueprint('carts', __name__)

@cart_routes.route('')
@login_required
def cart():
  cart = Cart.query.filter(Cart.user_id == current_user.id).first()

  return {'Cart': [item.to_dict() for item in cart]}

