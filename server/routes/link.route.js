import {Router} from 'express'; 


import { urlForward } from '../controllers/link.controller.js';


const router = Router();


router.get('/:url', urlForward);


export default router;