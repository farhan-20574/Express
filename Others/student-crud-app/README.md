# Student CRUD Application

This is a basic CRUD application built with Express and Node.js for managing student data. It allows users to create, read, update, and delete student records.

## Project Structure

```
student-crud-app
├── src
│   ├── app.js
│   ├── controllers
│   │   └── studentController.js
│   ├── models
│   │   └── student.js
│   ├── routes
│   │   └── studentRoutes.js
│   └── data
│       └── students.json
├── package.json
└── README.md
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd student-crud-app
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Usage

1. Start the application:
   ```
   node src/app.js
   ```

2. The application will run on `http://localhost:3000`.

## API Endpoints

- **Create a Student**
  - `POST /students`
  
- **Get All Students**
  - `GET /students`
  
- **Get a Student by ID**
  - `GET /students/:id`
  
- **Update a Student**
  - `PUT /students/:id`
  
- **Delete a Student**
  - `DELETE /students/:id`

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.

## License

This project is licensed under the MIT License.