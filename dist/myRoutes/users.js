"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uuid_1 = require("uuid");
const { registerRoute, getProfile, checkUserRequestingLogin } = require('./controller');
//Initialize our router
const router = express_1.default.Router();
//All routes in here are starting with /users
//Generating user ids
let userId = (0, uuid_1.v4)();
//Router for the home page
router.get('/', (req, res, next) => {
    res.status(200).render('index');
});
//Route for the about page
router.get('/about', (req, res, next) => {
    res.status(200).render('about', { abouttext: 'This is my own about page' });
});
//Register route
router.get('/register', (req, res, next) => {
    res.status(200).render('register');
});
//router.post("/test", (req:Request,res:))
router.post('/register', registerRoute);
// hashPassword('data.password')
// We will have to validate the entry before assigning it an id using joi
//Check if it already exists using the email to read from the db
//If it exists using 
//the data to a variable while reading; read from my dattabase, convert to object. use array.find to check with the info in d database
//res.error(404, sreve, this user already exist
//else
// Assign an id to it and Save it in our database by writing to it
//Login route
router.get('/login', (req, res) => {
    res.status(200).render('login');
});
//Route for successful login
router.post('/login', checkUserRequestingLogin);
//Route to validate logged in users
// router.get('/profile', getProfile)
// router.post('/login', passport.authenticate('local-login', { 
//     //Success go to Profile Page / Fail go to login page 
//     successRedirect : '/dashboard', 
//     failureRedirect : '/register', 
//     failureFlash : true 
// })); 
//check if email exists first
//throw error message
// comparePassword('req.body.password', 'databaseId')
//validate if user exists, you will still read from database
// then serve the dashboard page if it exists
//if it does not response(404) message: You are not an admin, i can serve the homepage
//if it exists, serve dashboard
//Route for dashboard
router.get('/dashboard', (req, res) => {
    res.status(200).render('dashboard');
});
//Route for successful registration and adding user to our database
router.post('/', (req, res) => {
    const user = req.body;
    // We will have to validate the entry before assigning it an id using joi
    //Check if it already exists using the email 
    //Save to a variable while reading: I will read the json file, convert to object. use array.find to check with the info in d database
    //If it doesn't, you assign it an id and write to the database
    const userWithId = Object.assign(Object.assign({}, user), { id: userId });
    // registrationData.push(userWithId)
    // console.log(registrationData)
    res.status(200).send(`
    <div style="margin: auto;
    width: 60%;
    padding: 10px;"><h1> Congratulations ${user.first_name}, your account has been created!!<a href="./login"> go to login</a></h1></div>
    `);
});
//This route checks if user exists, then add course
router.get('/:id', (req, res) => {
    const { id } = req.params;
    // const foundUser = registrationData.find((user)=>user.id === req.params.id)
    //Here, i will have to read from the database to find users with a particular id
    // res.send(foundUser)
});
//Route to delete courses
router.delete('/:id', (req, res) => {
    //Getting the current id to check
    const { id } = req.params;
    let course;
    // registrationData = registrationData.filter((user)=> user.id!== req.params.id)
    res.status(200).send(`Course ${course} deleted from the database`);
});
// //route to add users to the database say receiving data from a form
// router.post('/', (req: Request, res: Response, next: NextFunction) => {
//     res.send(req.body)
//     databaseInit(req.body)
// })
exports.default = router;
//# sourceMappingURL=users.js.map