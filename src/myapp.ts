// import http, { IncomingMessage, ServerResponse, Server } from "http";
import express, { Application, Request, Response, NextFunction} from 'express';
import bodyParser from 'body-parser'
import userRouters from './myRoutes/users'


//Initializing the express app
const app: Application = express();
app.use(bodyParser.json())  //Means that we are going to use json data in our whole app
app.use(express.urlencoded({extended: true}))


//Adding static files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + '/public/css'))
app.use('/img', express.static(__dirname + '/public/img'))
// console.log('dir is: ',__dirname)
//Setting views
app.set('views', (__dirname+'/views'))
app.set('view engine', 'ejs')
app.use('/', userRouters)
//app.use('/about', userRouters)
// app.use('/users', userRouters)


//Sending request to the homepage
//app.use('/register', userRouters)   //Register router
// app.use('/login', userRouters)  //Login router
//app.use('/', userRouters)   //Post router for form data


app.listen(3232, () => {
    console.log('Server has started listening on port 3232')
})
