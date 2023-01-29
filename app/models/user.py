from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy import UniqueConstraint

def add_prefix_for_prod(attr):
    if environment == "production":
        return f"{SCHEMA}.{attr}"
    else:
        return attr


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(2), nullable=False)
    street_address = db.Column(db.String(100))
    zipcode = db.Column(db.Integer)
    hashed_password = db.Column(db.String(255), nullable=False)

    user_carts = db.relationship('Cart', back_populates='user')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'email': self.email,
            'city': self.city,
            'state': self.state,
            'streetAddress': self.street_address,
            'zipcode': self.zipcode,
            'userCarts': [user_cart.to_dict() for user_cart in self.user_carts]
        }

    def get_dict(self):
        return {
            'firstName': self.first_name
        }

class Item(db.Model):
    __tablename__ ='items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    category = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float(7), nullable=False)
    image_url = db.Column(db.Text, nullable=False)
    in_stock = db.Column(db.Boolean, nullable=False, default=True)

    reviews = db.relationship('Review', back_populates='item')
    cart = db.relationship('Cart', back_populates='items')



    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'category': self.category,
            'description': self.description,
            'price': self.price,
            'imageUrl': self.image_url,
            'inStock': self.in_stock,
            'reviews': [review.to_dict() for review in self.reviews]
        }

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    item_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('items.id')), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    review = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    image_url = db.Column(db.Text)


    item = db.relationship('Item', back_populates='reviews')


    user = db.relationship("User", foreign_keys=[user_id])

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'itemId': self.item_id,
            'review': self.review,
            'rating': self.rating,
            'imageUrl': self.image_url,
            'title': self.title,
            'user': self.user.get_dict()
        }

class Cart(db.Model):
    __tablename__ = 'carts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    item_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('items.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    quantity = db.Column(db.Integer, default=1)

    item = db.relationship("Item", foreign_keys=[item_id])

    user = db.relationship('User', back_populates='user_carts')
    items = db.relationship('Item', back_populates='cart')

    def to_dict(self):
        return {
            'id': self.id,
            'itemId': self.item_id,
            'userId': self.item_id,
            'quantity': self.quantity,
            'item': self.item.to_dict()
        }
