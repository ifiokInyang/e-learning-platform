# EXPRESS

### Setup

1. Use and setup the project with `yarn`.
2. Convert the project to Typescript.
3. Initialize tsconfig.
4. Create .gitignore file to ignore the node_modules
## Problem Description:

Create A basic Express application, that makes a CRUD operation (create, read, update, delete) using a json file as database, document and publish your endpoints using postman.
In this project, you’ll build a basic CRUD (Create, Read, Update, Delete) for an e-learning platform

## Requirements:

IMPLEMENT AUTHORIZATION AND AUTHENTICATION: PROTECT ALL ROUTES. ONLY THE LOGGED-IN USERS CAN PERFORM THE FOLLOWING OPERATIONS

- You can add a course.
- You can edit courses.
- You can delete a courses.

## NOTE
- Users that are not authenticated can browse through all courses on the app

## How will I complete this project?

- Your aplication should be able to perform.
  - `GET` Request which returns all the data in your database
  - `POST` Request which adds data to your database
  - `PUT` Request which updates fields of a particular data using the id in database
  - `DELETE` Request which removes a particular data from your database using the id
- Host your application on Heroku.
- Data format example: This show the model for users and the courses added/created by the user

```
[

 {
   fullname: 'john doe',
   email: 'john@example.com', // no duplicates allowed.
   phone:'+2347085647535',
   address:'1, rantech stop, ',
 }
 
   Courses:[
   {
    title: 'Learn Node.js',
    description :'With this course you can understand Node.js comprehensively'
    image:"https://mycourseimge.com",
    price:60000,
    id:"databaseId1"
   }
   ......
]
```

## FRONTEND

- Page to display all courses( image including description and price)
- Implement an admin/dashboard area to add, edit and delete ( User can only edit and delete courses created by them)
- Create a Login Page and Sign Up Page

## Test coverage

- Make sure you write test to cover your application using Jest/supertest

### Test

- Test for a GET request
- Test for a POST request
- Test for a PUT request
- Test for a DELETE request
- Test to return proper HTTP status codes
