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
const checkUserRequestingLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email_address, password } = req.body;
    console.log('body is ', req.body.pass);
    console.log('email is ', email_address);
    console.log('pass ', password);
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
    res.status(200).render('dashboard');
});
// checkUserRequestingLogin()
module.exports = {
    databaseInit,
    registerRoute,
    checkUserRequestingLogin
};
//# sourceMappingURL=controller.js.map