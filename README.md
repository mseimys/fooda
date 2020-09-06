# Food Delivery Application (FooDA)

## Task

- [x] User must be able to create an account and log in.
- [x] Implement 2 roles with different permission levels
  - Regular User: Can see all restaurants and place orders from them
  - Restaurant Owner: Can CRUD restaurants and meals
- [x] A Restaurant should have a name and description of the type of food they serve
- [x] A meal should have a name, description, and price
- [x] Orders consist of a list of meals, date, total amount and status
- An Order should be placed for a single Restaurant only, but it can have multiple meals
- Restaurant Owners and Regular Users can change the Order Status respecting below flow and permissions:
  - Placed: Once a Regular user places an Order
  - Canceled: If the Regular User cancel the Order
  - Processing: Once the Restaurant Owner starts to make the meals
  - In Route: Once the meal is finished and Restaurant Owner marks it’s on the way
  - Delivered: Once the Restaurant Owner receives information that the meal was delivered by their staff
  - Received: Once the Regular User receives the meal and marks it as Received
- Status should follow the sequence as stated above, and not allowed to move back
- Status can not be changed by a different user than is stated above
- Orders should have a history about the date and time of the status changing
- Both Regular Users and Restaurant Owners should be able to see a list of the orders
- Restaurant Owners have the ability to block a User

- REST API. Make it possible to perform all user actions via the API, including authentication.
- In any case, you should be able to explain how a REST API works and demonstrate that by creating functional tests that use the REST Layer directly. Please be prepared to use REST clients like Postman, cURL, etc. for this purpose.
- If it’s a web application, it must be a single-page application. All actions need to be done client-side using AJAX, refreshing the page is not acceptable.
- Functional UI/UX design is needed. You are not required to create a unique design, however, do follow best practices to make the project as functional as possible.
- Bonus: unit and e2e tests.

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
