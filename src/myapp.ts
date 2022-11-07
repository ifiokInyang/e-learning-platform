import express, { Application} from 'express';
import bodyParser from 'body-parser'
import userRouters from './myRoutes/users'
// import postRoutes from './myRoutes/posts'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
//Initializing the express app
const app: Application = express();

dotenv.config()
//Middlewwares
app.use(bodyParser.json())  //Means that we are going to use json data in our whole app
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())


//Adding static files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + '/public/css'))
app.use('/img', express.static(__dirname + '/public/img'))
console.log('dir is: ',__dirname)
//Setting views
app.set('views', (__dirname+'/views'))
app.set('view engine', 'ejs')
app.use('/', userRouters)
// app.use('/protected', postRoutes)


app.listen(3232, () => {
    console.log('Server has started listening on port 3232')
})
