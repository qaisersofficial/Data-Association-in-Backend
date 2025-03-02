# Data-Association-in-Backend
## Project Overview

This project demonstrates data association in a backend application using Node.js, Express, and MongoDB. It includes user authentication, post creation, and post liking functionalities.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/qaisersofficial/Data-Association-in-Backend.git
    ```
2. Navigate to the project directory:
    ```bash
    cd Data-Association-in-Backend
    ```
3. Install the dependencies:
    ```bash
    npm install express bcrypt nodemon mongoose jsonwebtoken cookie-parser ejs
    ```

## Usage

1. Start the server:
    ```bash
    npx nodemon index.js
    ```
2. Open your browser and navigate to `http://localhost:3000`.

## Endpoints

- `GET /` - Render login page.
- `GET /login` - Render login page.
- `GET /register` - Render registration page.
- `GET /logout` - Logout user and redirect to login page.
- `GET /profile` - Render user profile with posts.
- `GET /like/:id` - Like or unlike a post.
- `GET /edit/:id` - Render edit post page.
- `POST /post` - Create a new post.
- `POST /register` - Register a new user.
- `POST /login` - Login a user.
- `POST /update/:id` - Update a post.

## Middleware

- `isLoggedIn` - Middleware to check if the user is logged in.

## Models

- `User` - User model with fields: username, name, email, age, password, and posts.
- `Post` - Post model with fields: user, content, and likes.

## License

This project is licensed under the MIT License.