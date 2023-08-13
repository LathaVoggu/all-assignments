const express = require('express');
const app = express();

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

function findExistingAdmin(username){
  for(let i=0; i<ADMINS.length; i++){
    let admin = ADMINS[i];
    if(username == admin.username){
      return true
    }else{
      return false;
    }
  }
}

function findExistingCourse(courseTitle){
  for(let i=0; i<COURSES.length; i++){
    let course = COURSES[i];
    console.log("courseTitle: "+courseTitle + "existingCourse: "+course.title);
    if(courseTitle == course.title){
      return true
    }else{
      return false;
    }
  }
}

// Admin routes
app.post('/admin/signup', (req, res) => {
   // logic to sign up admin
  let admin = req.body;
  let isExistingAdmin = findExistingAdmin(admin.username); // filitering existing users
// let isExistingAdmin = ADMINS.find(a => a.username == userName);
  console.log("isExistingAdmin: ",isExistingAdmin);
  if(isExistingAdmin){
    res.status(201).json({
      message : 'User is already existed.'
    })
  }else{
    let newAdmin = {
      username : admin.username,
      password : admin.password
    };
    ADMINS.push(newAdmin)
    res.status(201).json({
      message : 'User created successfully'
    })
  }
});

function authenticateAdmin(username, password){
  for(let i=0; i<ADMINS.length; i++){
    let admin = ADMINS[i];
    if(username == admin.username && password == admin.password){
      return true
    }else{
      return false;
    }
  }
}

app.post('/admin/login', (req, res) => {
  // logic to log in admin
  let userName = req.headers.username;
  let password = req.headers.password;
  let isAuthenticated = authenticateAdmin(userName,password);
  if(isAuthenticated){
    res.status(201).json({message : 'Logged in successfully'})
  }else{
    res.status(401).json({message : "Invalid credentials"})
  }
});

app.post('/admin/courses', (req, res) => {
  // logic to create a course
  console.log(req.body);
  let userName = req.headers.username;
  let password = req.headers.password;
  let isAuthenticated = authenticateAdmin(userName,password);
  if(isAuthenticated){
    let course = req.body;
    console.log("courseTitle: ", course.title);
    let isExistingCourse = findExistingCourse(course.title); // filitering existing courses
    console.log("isExistingCourse: ",isExistingCourse);
    if(isExistingCourse){
      res.status(201).json({
        message : 'Course is already existed.'
      })
    }else{
      let newCourse = {
        title : course.title,
        description : course.description,
        price : course.price,
        imageLink : course.imageLink,
        published : course.published,
       // courseId : Math.floor(Math.random() * 100)
      };
      COURSES.push(newCourse)
      res.status(201).json({ message: 'Course created successfully', courseId: 1})
    }
  }else{
    res.status(401).json({message : "Invalid credentials"})
  }
});

app.put('/admin/courses/:courseId', (req, res) => {
  // logic to edit a course
});

app.get('/admin/courses', (req, res) => {
  // logic to get all courses
  res.json(COURSES);
});

// User routes
app.post('/users/signup', (req, res) => {
  // logic to sign up user
});

app.post('/users/login', (req, res) => {
  // logic to log in user
});

app.get('/users/courses', (req, res) => {
  // logic to list all courses
});

app.post('/users/courses/:courseId', (req, res) => {
  // logic to purchase a course
});

app.get('/users/purchasedCourses', (req, res) => {
  // logic to view purchased courses
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
