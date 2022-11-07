import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction} from 'express'

//Middleware function that we can add to routes that we want to be protected
const auth = (req: Request, res:  Response, next: NextFunction)=>{
    const token = req.header('auth-token') //When we send a request, this checks if the token is in the header
    if(!token) return res.status(401).send('Access Denied')
    try{
        const verified = jwt.verify(token, `${process.env.TOKEN_SECRET}`) //If the token is in the header, it will verify it
        req.user = verified
        next()  //To pass the handler to the next middleware function
    }catch(err){    
        res.status(400).send('Invalid Token')
    }
}


export default auth