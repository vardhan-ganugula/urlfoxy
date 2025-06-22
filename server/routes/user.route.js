import {Router} from 'express';


const router = Router();


router.get('/profile', (req, res) => {
    res.status(200).json({
        message: 'User status fetched successfully',
        user: req.user
    }); 
})




export default router;