# API Documentation

## User Endpoints

### Register User

- **URL:** `/api/user/register`
- **Method:** `POST`
- **Request:**
  - Body:
    - `username` (string): User's username
    - `email` (string): User's email
    - `password` (string): User's password

- **Response:**
  - Status Code: `201 Created`
  - Body: `{ "message": "User created successfully" }`

### Login User

- **URL:** `/api/user/login`
- **Method:** `POST`
- **Request:**
  - Body:
    - `email` (string): User's email
    - `password` (string): User's password

- **Response:**
  - Status Code: `200 OK`
  - Body: `{ token: 'jwt-token' }`

### Request Password Reset

- **URL:** `/api/user/request-password-reset`
- **Method:** `POST`
- **Request:**
  - Body:
    - `email` (string): User's email

- **Response:**
  - Status Code: `200 OK`
  - Body: `{ message: 'Password reset link has been sent to your email' }`

### Reset Password

- **URL:** `/api/user/reset-password`
- **Method:** `POST`
- **Request:**
  - Body:
    - `email` (string): User's email
    - `password` (string): New password
    - `token` (string): Reset token

- **Response:**
  - Status Code: `200 OK`
  - Body: `{ message: 'Password reset successful' }`

## Class Endpoints

### Create Class

- **URL:** `/api/user/create-class`
- **Method:** `POST`
- **Request:**
  - Body:
    - `className` (string): Name of the class
    - `description` (string): Description of the class
    - `instructor` (string): Instructor's name
    - `schedule` (string): Class schedule

- **Response:**
  - Status Code: `201 Created`
  - Body: `{ message: 'Class created successfully' }`

### Get Classes

- **URL:** `/api/user/get-classes`
- **Method:** `GET`

- **Response:**
  - Status Code: `200 OK`
  - Body: `[ { class details }, { class details }, ... ]`

### Enroll in Class

- **URL:** `/api/user/enroll-in-class`
- **Method:** `POST`
- **Request:**
  - Body:
    - `userId` (string): ID of the user
    - `classId` (string): ID of the class

- **Response:**
  - Status Code: `200 OK`
  - Body: `{ message: 'Enrolled successfully' }`

### Update Class

- **URL:** `/api/user/update-class`
- **Method:** `PUT`
- **Request:**
  - Body:
    - `classId` (string): ID of the class to update
    - Other parameters to update

- **Response:**
  - Status Code: `200 OK`
  - Body: `{ message: 'Class updated successfully' }`

### Delete Class

- **URL:** `/api/user/delete-class`
- **Method:** `DELETE`
- **Request:**classId
  - Body:
    - `classId` (string): ID of the class to delete

- **Response:**
  - Status Code: `200 OK`
  - Body: `{ message: 'Class deleted successfully' }`

### Get Class by ID

- **URL:** `/api/user/get-class/:classId`
- **Method:** `GET`

- **Response:**
  - Status Code: `200 OK`
  - Body: `{ class details }`

