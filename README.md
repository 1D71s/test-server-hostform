# Nest.js Project with MongoDB and JWT

This project is built using [Nest.js](https://nestjs.com/), a framework for building scalable applications on Node.js, with MongoDB as the database and JWT for authentication.

## Installation

1. Make sure you have Node.js installed. You can download it [here](https://nodejs.org/).

2. Clone the repository:

    ```bash
    git clone <https://github.com/1D71s/test-server-hostform>
    ```

3. Navigate to the project directory:

    ```bash
    cd project-directory
    ```

4. Install dependencies:

    ```bash
    npm install
    ```

## Database Setup

1. Create a `.env` file in the root directory of the project.

2. Add a line to the `.env` file with the connection string to your MongoDB database. Example:

    ```plaintext
    DATABASE_URL=mongodb+srv://username:password@cluster0.7cap7t3.mongodb.net/database_name?retryWrites=true&w=majority
    ```

   Replace `username`, `password`, and `database_name` with your actual MongoDB connection details.

## JWT Configuration

1. In the `.env` file, add a secret key for generating JWT tokens. Example:

    ```plaintext
    PRIVATE_KEY=your_private_key
    ```

   Replace `your_private_key` with your actual secret key.

## Running the Application

1. Start the application:

    ```bash
    npm run start
    ```

2. The application will be available at [http://localhost:8000](http://localhost:8000).