import {Router} from 'express';
import { handleGetUserSession, handleTerminateUserSession } from '../controllers/user.controller.js';


const router = Router();


router.get('/profile', (req, res) => {
    res.status(200).json({
        message: 'User status fetched successfully',
        user: req.user
    }); 
})

router.get('/sessions', handleGetUserSession)
router.delete('/sessions/:sessionId', handleTerminateUserSession);

export default router;