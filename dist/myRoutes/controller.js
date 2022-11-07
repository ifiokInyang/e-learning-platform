"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const { validateUser } = require('./validator');
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const _ = require('lodash');
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//Generating user ids
let userId = (0, uuid_1.v4)();
const db = path_1.default.join(__dirname, 'database.json');
console.log('db is ', db);
//Creating our database.json
const databaseInit = () => {
    fs_1.default.writeFileSync(db, "[]", 'utf-8');
};
databaseInit();
const registerRoute = (req, res) => {
    //     //hash the password
    let data = req.body;
    console.log(data);
    let jsonformat;
    //     //Make this an async function
    let dbContent = fs_1.default.readFileSync(db, 'utf-8');
    let parsedDbContent = JSON.parse(dbContent);
    const storeUserInDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const dbDetails = yield parsedDbContent;
            console.log('d  after await ', dbDetails);
            const found = dbDetails.find((user) => user.email_address === data.email_address);
            //             //For first user
            // if(dbDetails.length == 0){
            console.log('d  after ', dbDetails);
            const { error, value } = validateUser(data);
            if (error || found) {
                res.status(400).send(JSON.stringify({
                    status: 'error',
                    message: 'Invalid request data or your email is already registered'
                }));
                //                         //If validation pulls through
            }
            else {
                res.status(200).send(`
                            <div style="margin: auto;
                            width: 60%;
                            padding: 10px;"><h1> Congratulations ${data.first_name}, your account has been created!!<a href="./login"> go to login</a></h1></div>
                            `);
                bcrypt_1.default.hash(value.password, 10, (err, hash) => {
                    if (err)
                        console.error('Hashing error');
                    //                             // store hash in the database
                    let removed = _.omit(value, ['confirm_password']);
                    removed.password = hash;
                    dbDetails.push(Object.assign(Object.assign({}, removed), { id: userId }));
                    jsonformat = JSON.stringify(dbDetails);
                    fs_1.default.writeFile(db, `${jsonformat}`, 'utf-8', (err) => {
                        if (err)
                            console.log("Error in writing file");
                        console.log('Successfully wrote to file');
                    });
                });
            }
        }
        catch (error) {
            if (error)
                console.error('Internal error occurred');
        }
    });
    storeUserInDatabase();
};
// const loginRoute = (req: Request, res: Response) => {
//     let requestBody = req.body
//     // bcrypt.compare(plaintextPassword, hash, function(err, result) {
//     //     if (result) {
//     //        // password is valid
//     //    }
//     // });
// // isLoggedIn, function(req, res, next) { 
// //         res.render('profile', { title: 'Profile Page', user : req.user, avatar: gravatar.url(req.user.email ,  {s: '100', r: 'x', d: 'retro'}, true) }); 
// //     }); 
// }
// res.status(200).render('login')
// const getProfile = () => {
// }
/* check if user is logged in */
// function isLoggedIn(req: Request, res: Response, next:NextFunction) { 
//     if (req.isAuthenticated()) 
//         return next(); 
//     res.redirect('/login'); 
// } 
const dashBoard = (req, res) => {
    res.status(200).render('dashboard');
};
const postDetails = (req, res) => {
    let body = req.body;
    fs_1.default.readFile(db, 'utf8', (err, data) => {
        if (err)
            console.error('Error in reading file');
        let parsed = JSON.parse(data);
        if (parsed.Courses == undefined) {
            console.log('first parsed is ', parsed);
            let foundId = parsed.find((user) => user.id === body.id);
            let courseArray = [];
            courseArray.push(body);
            let coursed = (Object.assign(Object.assign({}, foundId), { Courses: courseArray }));
            console.log('coursed is ', coursed);
            fs_1.default.writeFile(db, JSON.stringify(coursed), 'utf8', (err) => {
                if (err)
                    console.error('Error in writing file');
                console.log('Successfully wrote to database');
                res.status(200).render('dashboard');
            });
        }
        else {
            parsed.Courses.push(body);
            fs_1.default.writeFile(db, JSON.stringify(parsed), 'utf8', (err) => {
                if (err)
                    console.error('Error in writing file');
                console.log('Successfully wrote to database');
                res.status(200).render('dashboard');
            });
        }
        // res.status(301).redirect('/dashboard/:id/courses')
    });
};
const displayCourses = (req, res) => {
    console.log(req.body);
    console.log(req.header);
    console.log(req.headers);
    console.log(req.params);
    res.status(200).render('add_course');
};
const checkUserRequestingLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email_address, password } = req.body;
    //Reading from the database
    const dbContent = fs_1.default.readFileSync(db, 'utf-8');
    const parsedDbContent = JSON.parse(dbContent);
    //Found 
    let foundEmail = parsedDbContent.find((user) => user.email_address === email_address);
    if (!foundEmail)
        return res.status(403).json({ message: 'Invalid credentials' });
    const result = yield bcrypt_1.default.compare(password, foundEmail.password);
    if (!result) {
        return res.status(403).json({ message: 'Invalid credentials' });
    }
    //Create and assign a token
    const token = jsonwebtoken_1.default.sign({ _id: foundEmail.id }, `${process.env.TOKEN_SECRET}`);
    // res.header('auth-token', token) //Setting the header with the token
    // .redirect('/dashboard')
    // res.setHeader('Authorization', 'Bearer ' + token);
    res.redirect(300, `/dashboard/${foundEmail.id}`);
});
// checkUserRequestingLogin()
const protectedRoute = (req, res) => {
    res.json({
        posts: {
            title: 'My protected route',
            description: 'This is a protected route'
        }
    });
};
const addCourse = (req, res) => {
    const { id } = req.params;
    console.log('id is ', id);
    console.log('params id is ', req.params.id);
    res.status(200).send('Hello');
    //  fs.readFile(db, 'utf-8', (err, data) => {
    //     if(err) console.error('Error in reading file')
    //     else{
    //     }
    //  })
};
module.exports = {
    databaseInit,
    registerRoute,
    checkUserRequestingLogin,
    addCourse,
    dashBoard,
    postDetails,
    protectedRoute,
    displayCourses
};
//# sourceMappingURL=controller.js.map