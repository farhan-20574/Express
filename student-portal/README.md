# Student Portal

This is a Node.js project for a student portal application. It utilizes Express for the server framework, EJS for templating, and JWT for authentication.

## Project Structure

```
student-portal
├── src
│   ├── app.js               # Entry point of the application
│   ├── controllers          # Contains controller files
│   │   └── index.js        # Index controller for handling routes
│   ├── routes               # Contains route definitions
│   │   └── index.js        # Route definitions for the application
│   ├── middleware           # Contains middleware functions
│   │   └── auth.js         # Authentication middleware
│   ├── views                # Contains EJS view templates
│   │   └── index.ejs       # Homepage template
│   └── utils                # Utility functions
│       └── jwt.js          # JWT utility functions
├── package.json             # NPM configuration file
└── README.md                # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd student-portal
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Usage

To start the application, run:
```
npm start
```

The application will be available at `http://localhost:3000`.

## Features

- User authentication using JWT
- Dynamic homepage rendering with EJS
- Modular structure with controllers, routes, and middleware

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.