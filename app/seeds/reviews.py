from app.models import db, Review, environment, SCHEMA


# Adds a review, you can add other reviewss here if you want
def seed_reviews():
    review1 = Review(
      user_id=1, item_id=1, title='I do not hate it', review='Not the best, but not the worst', rating=3
    )
    review2 = Review(
      user_id=1, item_id=2, title='I do not hate it', review='Not the best, but not the worst', rating=3
    )
    review3 = Review(
      user_id=1, item_id=3, title='I do not hate it', review='Not the best, but not the worst', rating=3
    )
    review4 = Review(
      user_id=1, item_id=4, title='I do not hate it', review='Not the best, but not the worst', rating=3
    )
    review5 = Review(
      user_id=1, item_id=5, title='I do not hate it', review='Not the best, but not the worst', rating=3
    )
    review6 = Review(
      user_id=1, item_id=6, title='I do not hate it', review='Not the best, but not the worst', rating=3
    )
    review7 = Review(
      user_id=1, item_id=7, title='I do not hate it', review='Not the best, but not the worst', rating=3
    )
    review8 = Review(
      user_id=1, item_id=8, title='I do not hate it', review='Not the best, but not the worst', rating=3
    )
    review9 = Review(
      user_id=1, item_id=9, title='I do not hate it', review='Not the best, but not the worst', rating=3
    )
    review10 = Review(
      user_id=1, item_id=10, title='I do not hate it', review='Not the best, but not the worst', rating=3
    )
    review11 = Review(
      user_id=1, item_id=11, title='I do not hate it', review='Not the best, but not the worst', rating=3
    )
    review12 = Review(
      user_id=1, item_id=12, title='I do not hate it', review='Not the best, but not the worst', rating=3
    )
    review13 = Review(
      user_id=1, item_id=13, title='I do not hate it', review='Not the best, but not the worst', rating=3
    )
    review14 = Review(
      user_id=1, item_id=14, title='I do not hate it', review='Not the best, but not the worst', rating=3
    )
    review15 = Review(
      user_id=1, item_id=15, title='I do not hate it', review='Not the best, but not the worst', rating=3
    )
    review16 = Review(
      user_id=1, item_id=16, title='I do not hate it', review='Not the best, but not the worst', rating=3
    )
    review17 = Review(
      user_id=1, item_id=17, title='I do not hate it', review='Not the best, but not the worst', rating=3
    )
    review18 = Review(
      user_id=1, item_id=18, title='I do not hate it', review='Not the best, but not the worst', rating=3
    )
    review19 = Review(
      user_id=1, item_id=19, title='I do not hate it', review='Not the best, but not the worst', rating=3
    )
    review20 = Review(
      user_id=1, item_id=20, title='I do not hate it', review='Not the best, but not the worst', rating=3
    )
    review21 = Review(
      user_id=1, item_id=21, title='I do not hate it', review='Not the best, but not the worst', rating=3
    )
    review22 = Review(
      user_id=1, item_id=22, title='I do not hate it', review='Not the best, but not the worst', rating=3
    )
    review23 = Review(
      user_id=1, item_id=23, title='I do not hate it', review='Not the best, but not the worst', rating=3
    )
    review24 = Review(
      user_id=1, item_id=24, title='I do not hate it', review='Not the best, but not the worst', rating=3
    )
    review25 = Review(
      user_id=1, item_id=25, title='I do not hate it', review='Not the best, but not the worst', rating=3
    )
    review26 = Review(
      user_id=1, item_id=26, title='I do not hate it', review='Not the best, but not the worst', rating=3
    )
    review27 = Review(
      user_id=1, item_id=27, title='I do not hate it', review='Not the best, but not the worst', rating=3
    )
    review28 = Review(
      user_id=1, item_id=28, title='I do not hate it', review='Not the best, but not the worst', rating=3
    )
    review29 = Review(
      user_id=1, item_id=29, title='I do not hate it', review='Not the best, but not the worst', rating=3
    )
    review30 = Review(
      user_id=1, item_id=30, title='I do not hate it', review='Not the best, but not the worst', rating=3
    )
    review31 = Review(
      user_id=1, item_id=31, title='I do not hate it', review='Not the best, but not the worst', rating=3
    )
    review32 = Review(
      user_id=1, item_id=32, title='I do not hate it', review='Not the best, but not the worst', rating=3
    )
    review33 = Review(
      user_id=1, item_id=33, title='I do not hate it', review='Not the best, but not the worst', rating=3
    )
    review34 = Review(
      user_id=1, item_id=34, title='I do not hate it', review='Not the best, but not the worst', rating=3
    )
    review35 = Review(
      user_id=1, item_id=35, title='I do not hate it', review='Not the best, but not the worst', rating=3
    )
    review36 = Review(
      user_id=1, item_id=36, title='I do not hate it', review='Not the best, but not the worst', rating=3
    )
    review37 = Review(
      user_id=3, item_id=1, title='So great! ', review="As they say, you get what you pay for! I paid way more than I would have at target, so NATURALLY it's amazing!", rating=5
    )
    review38 = Review(
      user_id=3, item_id=2, title='So great! ', review="As they say, you get what you pay for! I paid way more than I would have at target, so NATURALLY it's amazing!", rating=5
    )
    review39 = Review(
      user_id=3, item_id=3, title='So great! ', review="As they say, you get what you pay for! I paid way more than I would have at target, so NATURALLY it's amazing!", rating=5
    )
    review40 = Review(
      user_id=3, item_id=4, title='So great! ', review="As they say, you get what you pay for! I paid way more than I would have at target, so NATURALLY it's amazing!", rating=5
    )
    review41 = Review(
      user_id=3, item_id=5, title='So great! ', review="As they say, you get what you pay for! I paid way more than I would have at target, so NATURALLY it's amazing!", rating=5
    )
    review42 = Review(
      user_id=3, item_id=6, title='So great! ', review="As they say, you get what you pay for! I paid way more than I would have at target, so NATURALLY it's amazing!", rating=5
    )
    review43 = Review(
      user_id=3, item_id=7, title='So great! ', review="As they say, you get what you pay for! I paid way more than I would have at target, so NATURALLY it's amazing!", rating=5
    )
    review44 = Review(
      user_id=3, item_id=8, title='So great! ', review="As they say, you get what you pay for! I paid way more than I would have at target, so NATURALLY it's amazing!", rating=5
    )
    review45 = Review(
      user_id=3, item_id=9, title='So great! ', review="As they say, you get what you pay for! I paid way more than I would have at target, so NATURALLY it's amazing!", rating=5
    )
    review46 = Review(
      user_id=3, item_id=10, title='So great! ', review="As they say, you get what you pay for! I paid way more than I would have at target, so NATURALLY it's amazing!", rating=5
    )
    review47 = Review(
      user_id=3, item_id=11, title='So great! ', review="As they say, you get what you pay for! I paid way more than I would have at target, so NATURALLY it's amazing!", rating=5
    )
    review48 = Review(
      user_id=3, item_id=12, title='So great! ', review="As they say, you get what you pay for! I paid way more than I would have at target, so NATURALLY it's amazing!", rating=5
    )
    review49 = Review(
      user_id=3, item_id=13, title='So great! ', review="As they say, you get what you pay for! I paid way more than I would have at target, so NATURALLY it's amazing!", rating=5
    )
    review50 = Review(
      user_id=3, item_id=14, title='So great! ', review="As they say, you get what you pay for! I paid way more than I would have at target, so NATURALLY it's amazing!", rating=5
    )
    review51 = Review(
      user_id=3, item_id=15, title='So great! ', review="As they say, you get what you pay for! I paid way more than I would have at target, so NATURALLY it's amazing!", rating=5
    )
    review52 = Review(
      user_id=3, item_id=16, title='So great! ', review="As they say, you get what you pay for! I paid way more than I would have at target, so NATURALLY it's amazing!", rating=5
    )
    review53 = Review(
      user_id=3, item_id=17, title='So great! ', review="As they say, you get what you pay for! I paid way more than I would have at target, so NATURALLY it's amazing!", rating=5
    )
    review54 = Review(
      user_id=3, item_id=18, title='So great! ', review="As they say, you get what you pay for! I paid way more than I would have at target, so NATURALLY it's amazing!", rating=5
    )
    review55 = Review(
      user_id=3, item_id=19, title='So great! ', review="As they say, you get what you pay for! I paid way more than I would have at target, so NATURALLY it's amazing!", rating=5
    )
    review56 = Review(
      user_id=3, item_id=20, title='So great! ', review="As they say, you get what you pay for! I paid way more than I would have at target, so NATURALLY it's amazing!", rating=5
    )
    review57 = Review(
      user_id=3, item_id=21, title='So great! ', review="As they say, you get what you pay for! I paid way more than I would have at target, so NATURALLY it's amazing!", rating=5
    )
    review58 = Review(
      user_id=3, item_id=22, title='So great! ', review="As they say, you get what you pay for! I paid way more than I would have at target, so NATURALLY it's amazing!", rating=5
    )
    review59 = Review(
      user_id=3, item_id=23, title='So great! ', review="As they say, you get what you pay for! I paid way more than I would have at target, so NATURALLY it's amazing!", rating=5
    )
    review60 = Review(
      user_id=3, item_id=24, title='So great! ', review="As they say, you get what you pay for! I paid way more than I would have at target, so NATURALLY it's amazing!", rating=5
    )
    review61 = Review(
      user_id=3, item_id=25, title='So great! ', review="As they say, you get what you pay for! I paid way more than I would have at target, so NATURALLY it's amazing!", rating=5
    )
    review62 = Review(
      user_id=3, item_id=26, title='So great! ', review="As they say, you get what you pay for! I paid way more than I would have at target, so NATURALLY it's amazing!", rating=5
    )
    review63 = Review(
      user_id=3, item_id=27, title='So great! ', review="As they say, you get what you pay for! I paid way more than I would have at target, so NATURALLY it's amazing!", rating=5
    )
    review64 = Review(
      user_id=3, item_id=28, title='So great! ', review="As they say, you get what you pay for! I paid way more than I would have at target, so NATURALLY it's amazing!", rating=5
    )
    review65 = Review(
      user_id=3, item_id=29, title='So great! ', review="As they say, you get what you pay for! I paid way more than I would have at target, so NATURALLY it's amazing!", rating=5
    )
    review66 = Review(
      user_id=3, item_id=30, title='So great! ', review="As they say, you get what you pay for! I paid way more than I would have at target, so NATURALLY it's amazing!", rating=5
    )
    review67 = Review(
      user_id=3, item_id=31, title='So great! ', review="As they say, you get what you pay for! I paid way more than I would have at target, so NATURALLY it's amazing!", rating=5
    )
    review68 = Review(
      user_id=3, item_id=32, title='So great! ', review="As they say, you get what you pay for! I paid way more than I would have at target, so NATURALLY it's amazing!", rating=5
    )
    review69 = Review(
      user_id=3, item_id=33, title='So great! ', review="As they say, you get what you pay for! I paid way more than I would have at target, so NATURALLY it's amazing!", rating=5
    )
    review70 = Review(
      user_id=3, item_id=34, title='So great! ', review="As they say, you get what you pay for! I paid way more than I would have at target, so NATURALLY it's amazing!", rating=5
    )
    review71 = Review(
      user_id=3, item_id=35, title='So great! ', review="As they say, you get what you pay for! I paid way more than I would have at target, so NATURALLY it's amazing!", rating=5
    )
    review72 = Review(
      user_id=3, item_id=36, title='So great! ', review="As they say, you get what you pay for! I paid way more than I would have at target, so NATURALLY it's amazing!", rating=5
    )

    reviews = [review1, review2, review3, review4, review5, review6, review7, review8, review9, review10,
    review11, review12, review13, review14, review15, review16, review17, review18, review19, review20, review21,
    review22, review23, review24, review25, review26, review27, review28, review29, review29, review30, review31,
    review32, review33, review34, review35, review36, review37, review38, review39, review40, review41, review42,
    review43, review44, review45, review46, review47, review48, review49, review50, review51, review52, review53,
    review54, review55, review56, review57, review58, review59, review60, review61, review62, review63, review64,
    review65, review66, review67, review68, review69, review70, review71, review72]
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
