import express from 'express';
const router = express.Router();
import { Request, Response, NextFunction} from 'express'


router.get('/protected', (req: Request, res: Response)=>{
    res.json({
        posts: {title: 'My protected route',
        description: 'This is a protected route'
    }
    })
    
})


// export default router;