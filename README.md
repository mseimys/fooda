# Food Delivery Application (FooDA)

A simple playground application to test various deployment scenarios. Features:

- User can create an account and log in.
- There are 2 roles:
  - Regular User: Sees all restaurants and can place orders
  - Restaurant Owner: Manages restaurants and menu items
- Orders can be in variuos states: Placed, Canceled, Processing, In Route, Delivered, Received
- Restaurant Owners can block a misbehaving User

## Development notes

Backend is created using Python 3.8 and Django 3.1, using Django Rest Framework 3.11 for API. Running backend:

- Create and activate python virtual environment
- Enter directory `fooda-backend`
- Install requirements via `pip install -r requirements.txt`
- Run database migrations when running first time: `./manage.py migrate`
- Launch backend: `./manage.py runserver`
- Navigate to backend: http://localhost:8000/
- Superuser can be created using command `./manage.py createsuperuser`. Go to http://localhost:8000/admin/ to login.
- Running tests: `pytest`

Fooda Frontend is created using TypeScript 3.9.7 and React 16.13. Bootstrap is used for styling. Launching frontend:

- `npm install`
- `npm start`
- Navigate to http://localhost:3000/
- All requests to http://localhost:3000/api/<path> are proxied to backend's http://localhost:8000/<path>
- Running tests: `npm test` (and press `a` to rerun all tests)

### Resources

- User (type, can be blocked by a restaurant)
- Restaurant (name, description, owner?)
- Meal (name, description, price)
- Order (status, restaurant, multiple meals, date, total amount, status values: x, history)
- History Item (order, user, date, message)

### Pages

- Signup
- Login
- Create/edit Restaurant information (owner)
- CRUD meal of a restaurant (owner)
- Restaurant List
- Restaurant Details including menu
- Order overview (Cart) and placement
- Restaurant Management (for owner, outstanding orders)
- Order list (regular user)
- Order details (meals, change status)
- Order history
- Block regular user dialog
