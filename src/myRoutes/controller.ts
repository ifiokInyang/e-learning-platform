import { Request, Response, NextFunction} from 'express'
import path from 'path'
import fs from 'fs'
const { validateUser } = require('./validator')
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt'
const _ = require('lodash')
import jwt from 'jsonwebtoken'
import passport from 'passport'
import { env } from 'process'


//Generating user ids
let userId = uuidv4()




const db = path.join(__dirname, 'database.json')
console.log('db is ', db)
//Creating our database.json
const databaseInit = () => {
fs.writeFileSync(db, "[]", 'utf-8')
}
databaseInit()





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

const dashBoard = (req: Request, res: Response) => {
     res.status(200).render('dashboard')
    }

const postDetails = (req: Request, res: Response) => {
    let body = req.body
    fs.readFile(db, 'utf8', (err, data) => {
        if(err) console.error('Error in reading file')
        let parsed = JSON.parse(data)
        if(parsed.Courses ==undefined){
            console.log('first parsed is ', parsed)
            let foundId = parsed.find((user: any) => user.id === body.id)
            let courseArray = []
            courseArray.push(body)
            let coursed = ({...foundId, Courses: courseArray})
            console.log('coursed is ', coursed)
            fs.writeFile(db, JSON.stringify(coursed), 'utf8', (err) => {
                if(err) console.error('Error in writing file')
                console.log('Successfully wrote to database')
            res.status(200).render('dashboard')
            })
        } else {
            parsed.Courses.push(body)
            fs.writeFile(db, JSON.stringify(parsed), 'utf8', (err) => {
                if(err) console.error('Error in writing file')
                console.log('Successfully wrote to database')
            res.status(200).render('dashboard')
            })
        }
       
        // res.status(301).redirect('/dashboard/:id/courses')
    })
}
const displayCourses = (req: Request, res: Response) => {
    console.log(req.body)
    console.log(req.header)
    console.log(req.headers)
    console.log(req.params)
    res.status(200).render('add_course')
}

const checkUserRequestingLogin = async(req: Request, res: Response) => {
    const { email_address, password } = req.body
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

            //Create and assign a token
            const token = jwt.sign({_id: foundEmail.id}, `${process.env.TOKEN_SECRET}`)  
            // res.header('auth-token', token) //Setting the header with the token
            // .redirect('/dashboard')


            // res.setHeader('Authorization', 'Bearer ' + token);
            res.redirect(300, `/dashboard/${foundEmail.id}`)
   
}
// checkUserRequestingLogin()

const protectedRoute = (req: Request, res: Response) => {
        res.json({
            posts: {
                title: 'My protected route',
            description: 'This is a protected route'
            }
        }) 
    }


const addCourse = (req: Request, res: Response) => {
    const { id } = req.params
    console.log('id is ', id)
        console.log('params id is ', req.params.id)
        res.status(200).send('Hello')
//  fs.readFile(db, 'utf-8', (err, data) => {
//     if(err) console.error('Error in reading file')
//     else{

//     }
//  })

}





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