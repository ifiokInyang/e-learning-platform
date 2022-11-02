import { Request, Response, NextFunction} from 'express'
import path from 'path'
import fs from 'fs'
const { validateUser } = require('./validator')
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt'
const _ = require('lodash')
import passport from 'passport'
//Generating user ids
let userId = uuidv4()

const db = path.join(__dirname, 'database.json')
console.log('db is ', db)
//Creating our database.json
const databaseInit = () => {
fs.writeFileSync(db, "[]", 'utf-8')
}
databaseInit()
// const databaseInit = () => {
//     // fs.access(db, fs.constants.F_OK, (err: any) =>{
//         // if (err) {
//             fs.writeFile(db, p, 'utf-8', (err: any)=>{
//                 if (err) console.error("An error occurred")
//                 console.log("Successfully created database file")
//             })
//         // }
//     // })

// }
// databaseInit()




const registerRoute = (req: Request, res: Response) => {
//     //hash the password
    let data = req.body
    console.log(data)
    let jsonformat: any;
//     //Make this an async function
let dbContent = fs.readFileSync(db, 'utf-8')
let parsedDbContent = JSON.parse(dbContent)
    const storeUserInDatabase = async () => {
        try {
            const dbDetails = await parsedDbContent
            console.log('d  after await ', dbDetails)
            const found = dbDetails.find((user: any)=> user.email_address === data.email_address)

//             //For first user
            // if(dbDetails.length == 0){
                console.log('d  after ',  dbDetails)
                const {error, value} = validateUser(data)
                    if (error || found){
                        res.status(400).send(JSON.stringify({
                            status: 'error',
                            message: 'Invalid request data or your email is already registered'
                        }))
//                         //If validation pulls through
                    } else {
                        res.status(200).send(`
                            <div style="margin: auto;
                            width: 60%;
                            padding: 10px;"><h1> Congratulations ${data.first_name}, your account has been created!!<a href="./login"> go to login</a></h1></div>
                            `)
                            bcrypt.hash(value.password, 10, (err, hash) =>{
                            if(err) console.error('Hashing error')
//                             // store hash in the database
                            let removed = _.omit(value, ['confirm_password'])
                            removed.password = hash
                            dbDetails.push({...removed, id:userId})
                            jsonformat = JSON.stringify(dbDetails)
                            fs.writeFile(db, `${jsonformat}`, 'utf-8', (err:any)=>{
                            if(err) console.log("Error in writing file")
                            console.log('Successfully wrote to file')
                            })
                        })
                    } 
        } catch (error) {
            if(error) console.error('Internal error occurred')
        }
    }
    storeUserInDatabase()  
}

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

const checkUserRequestingLogin = async(req: Request, res: Response) => {
    const { email_address, password } = req.body
    console.log('body is ', req.body.pass)
    console.log('email is ', email_address)
    console.log('pass ', password)
    //Reading from the database
    const dbContent = fs.readFileSync(db, 'utf-8')
    const parsedDbContent = JSON.parse(dbContent)
    //Found 
    let foundEmail = parsedDbContent.find((user: any)=> user.email_address === email_address)
    if(!foundEmail) return res.status(403).json({message: 'Invalid credentials'})
            const result = await bcrypt.compare(password, foundEmail.password);
            if (!result) {
                return res.status(403).json({message: 'Invalid credentials'})
            }
            res.status(200).render('dashboard')
   
}
// checkUserRequestingLogin()


module.exports = {
    databaseInit,
    registerRoute,
    checkUserRequestingLogin
}