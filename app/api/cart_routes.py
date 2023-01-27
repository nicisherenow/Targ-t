from flask import Blueprint, jsonify, session, request
from app.models import Cart, db, Item
from flask_login import current_user, login_required
from ..forms import CartForm
from .auth_routes import validation_errors_to_error_messages

cart_routes = Blueprint('carts', __name__)

@cart_routes.route('')
@login_required
def cart():
  """
  Get all carts for current user
  """
  carts = Cart.query.filter(Cart.user_id == current_user.id).all()

  return {'carts': [cart.to_dict() for cart in carts]}

@cart_routes.route('/<int:id>', methods=['POST'])
@login_required
def new_cart(id):
  """
  Create a new cart with a specific quantity
  """
  currentId = current_user.id
  item = Item.query.get(id)

  form = CartForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    existing_cart = Cart.query.filter(Cart.user_id == currentId, Cart.item_id == item.id).first()
    if existing_cart:
        existing_cart.quantity = form.data['quantity']
        db.session.commit()
        return existing_cart.to_dict()
    else:
        new_cart = Cart(
            item_id=item.id,
            quantity=form.data['quantity'],
            user_id=currentId,
        )
        db.session.add(new_cart)
        db.session.commit()
        return new_cart.to_dict()
