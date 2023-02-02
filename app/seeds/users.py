from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Demo', last_name='Demo', city='Clearfield', state='UT', street_address='180 Flower Ct', zipcode=84015, email='demo@aa.io', password='password')
    rambo = User(
        first_name='Rambo', last_name='Dillan', city='Merced', state='CA', street_address='180 Elk Ct', zipcode=95300, email='rambo@aa.io', password='password')
    randall = User(
        first_name='Randall', last_name='Flowen', city='Marysville', state='OH', street_address='2500 Walmart Ct', zipcode=81101, email='randall@aa.io', password='password')
    user4 = User(
        first_name='Luise', last_name='Shallots', city='Atwater', state='CA', street_address='300 Target Blvd', zipcode=81111, email='luise@aa.io', password='password'
    )
    user5 = User(
        first_name='Frank', last_name='Furter', city='France', state='CA', street_address='200 Home Depot Way', zipcode=81211, email='frank@aa.io', password='password'
    )
    users = [demo, rambo, randall, user4, user5]

    [db.session.add(user) for user in users]
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
