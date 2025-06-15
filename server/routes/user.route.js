import {Router} from 'express';


const router = Router();


router.get('/profile', (req, res) => {
    res.status(200).json({
        message: 'User route is working',
        user: req.user
    }); 
})




export default router;