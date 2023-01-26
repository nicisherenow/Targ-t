from app.models import db, Review, environment, SCHEMA


# Adds a review, you can add other reviewss here if you want
def seed_reviews():
    review1 = Review(
      user_id=1, item_id=1, title='I do not hate it', review='Not the best, but not the worst', rating=3, image_url='https://target.scene7.com/is/image/Target/GUEST_023509a9-8645-494e-af8f-90bc35277cdf?wid=325&hei=325&qlt=80&fmt=pjpeg'
    )
    review2 = Review(
      user_id=1, item_id=2, title='I do not hate it', review='Not the best, but not the worst', rating=3
    )

    reviews = [review1, review2]
    [db.session.add(review) for review in reviews]
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the reviews table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM reviews")

    db.session.commit()
