# Targét

## My project name is Targét
Here is the link! [Targét](https://target-cdfm.onrender.com)

My site is a clone of the [Target](https://www.target.com/) site. [Targét](https://target-cdfm.onrender.com) can be used as a site to view and checkout goods. If 
you don't have an account or just want to experience the different features you can do that by logging in as the demo user.

## Form usage:
Forms are all handled as modals and they are seemingly larger than life. For the review image portions available a web image url works just fine.

## Tech Stack utilized: 
- Javascript
- Node.js
- Flask.js
- React
- Redux
- SQLalchemy
- Python 3
- Alembic
- JSX
- SQLite3
- Html/CSS

### Database:
[Postgres](https://www.postgresql.org/)

## Wiki Links:
- [API endpoints](https://github.com/nicisherenow/Targ-t/wiki/API-endpoints)
- [Redux Store Shape](https://github.com/nicisherenow/Targ-t/wiki/Redux-Store-Shape)
- [Frontend endpoints and current features](https://github.com/nicisherenow/Targ-t/wiki/MVP-Feature-List)
- [DB schema with relationships](https://github.com/nicisherenow/Targ-t/wiki/DB-Schema)
- [User Stories](https://github.com/nicisherenow/Targ-t/wiki/User-Stories)

## Hosting: 
[Render](https://render.com/)

## Landing Page:
You can peruse the available items in the store and add them to cart, write reviews, and if the prices are too expensive; you can also just add them to wishlist. If
you don't have an account you can feel free to login as the available demo user to see some site functionality.
<img width="1200" alt="image" src="https://user-images.githubusercontent.com/110574773/216673771-5fb50477-87b4-45d1-8c8a-cc45d7f4330f.png">

## Landing Page - Logged in:
After logging in, the landing page can look like this.
<img width="1200" alt="image" src="https://user-images.githubusercontent.com/110574773/216674258-5e079ff7-682f-4680-acf5-caac9d1909ed.png">



## Running the app locally:

1. Clone this repository 

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, cd inside the `react-app` directory and type npm start.

## Contact me:
Nicholas Talbot
- [LinkedIn](https://www.linkedin.com/in/nicholas-talbot-5441a4242/)
- [Github](https://github.com/nicisherenow)
