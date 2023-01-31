from flask import Blueprint, jsonify, session, request
from app.models import Cart, db, Item, Wishlist
from flask_login import current_user, login_required
from ..forms import CartForm
from .auth_routes import validation_errors_to_error_messages

wishlist_routes = Blueprint('wishlists', __name__)

@wishlist_routes.route('')
@login_required
def cart():
  """
  Get all wishlists for current user
  """
  wishlists = Wishlist.query.filter(Wishlist.user_id == current_user.id).all()

  return {'wishlists': [wishlist.to_dict() for wishlist in wishlists]}

@wishlist_routes.route('/<int:id>', methods=['POST'])
@login_required
def new_cart(id):
  """
  Create a new wishlist if the item is not in the cart already
  """
  currentId = current_user.id
  item = Item.query.get(id)

  form = CartForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    existing_cart = Cart.query.filter(Cart.user_id == currentId, Cart.item_id == item.id).first()
    if existing_cart:
        return { 'errors': ['That item is already in your cart']}
    else:
        new_wishlist = Wishlist(
            item_id=item.id,
            user_id=currentId,
        )
        db.session.add(new_wishlist)
        db.session.commit()
        return new_wishlist.to_dict()

@wishlist_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_one(id):
  """
  Finds one wishlist by item id and then deletes that item
  """

  wishlist = Wishlist.query.filter(Wishlist.item_id == id).first()

  if not wishlist:
    return { "errors": ['wishlist does not exist']}

  db.session.delete(wishlist)
  db.session.commit()
  return current_user.to_dict(), 200

@wishlist_routes.route('/remove', methods=['DELETE'])
@login_required
def delete_all():
  """
  Finds all wishlist items that a user has and then deletes them
  """
  wishlists = Wishlist.query.filter(Wishlist.user_id == current_user.id).all()

  [db.session.delete(wishlist) for wishlist in wishlists]
  db.session.commit()
  return current_user.to_dict(), 200
