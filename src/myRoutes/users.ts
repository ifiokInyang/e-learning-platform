import express, { Request, Response, NextFunction} from 'express'
import { v4 as uuidv4 } from 'uuid';
const { registerRoute, postDetails, checkUserRequestingLogin, dashBoard, protectedRoute } = require('./controller')
const { displayCourses } = require('./controller')
import passport from 'passport'
import fs from 'fs';
import auth from '../middleware/auth'
//Initialize our router
const router = express.Router({mergeParams: true});
//All routes in here are starting with /users

//Generating user ids
let userId = uuidv4()


//Router for the home page
router.get('/', (req: Request, res: Response, next: NextFunction)=>{
    res.status(200).render('index')
})
//Route for the about page
router.get('/about', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).render('about', { abouttext: 'This is my own about page'})
})

//Register route
router.get('/register', (req: Request, res: Response, next: NextFunction)=>{
    res.status(200).render('register')
})
//router.post("/test", (req:Request,res:))
router.post('/register', registerRoute)
// hashPassword('data.password')
  


//Login route
router.get('/login', (req: Request, res: Response)=>{
    res.status(200).render('login')
})
//Route for successful login
router.post('/login', checkUserRequestingLogin)


//Route for dashboard
router.get('/dashboard/:id', dashBoard)

router.post('/dashboard/:id', postDetails)

router.get('/display_courses', displayCourses)

router.get('/protected', auth, protectedRoute)
//Route for successful registration and adding user to our database
router.post('/', (req: Request, res: Response)=>{
    const user = req.body
    // We will have to validate the entry before assigning it an id using joi
    //Check if it already exists using the email 
    //Save to a variable while reading: I will read the json file, convert to object. use array.find to check with the info in d database
    //If it doesn't, you assign it an id and write to the database
    
    const userWithId = { ...user, id:userId }
    // registrationData.push(userWithId)
    // console.log(registrationData)
    res.status(200).send(`
    <div style="margin: auto;
    width: 60%;
    padding: 10px;"><h1> Congratulations ${user.first_name}, your account has been created!!<a href="./login"> go to login</a></h1></div>
    `)
})

// router.get(`/dashboard/:id/add_course`, dashBoard)


//Route to delete courses
router.delete('/:id', (req: Request, res:Response)=>{
    //Getting the current id to check
    const { id } = req.params;
    let course;
    // registrationData = registrationData.filter((user)=> user.id!== req.params.id)
    res.status(200).send(`Course ${course} deleted from the database`)
})
// //route to add users to the database say receiving data from a form
// router.post('/', (req: Request, res: Response, next: NextFunction) => {
//     res.send(req.body)
//     databaseInit(req.body)
// })



export default router