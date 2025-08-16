import {Router} from 'express'; 


import { checkLinkExists, createLink, deleteLink, getLinkById, getLinks, getLinksByGroup, updateLink } from '../controllers/link.controller.js';



const router = Router();



router.post('/', createLink);
router.delete('/:id', deleteLink);
router.get('/', getLinks);
router.get('/:id', getLinkById); 
router.get('/group/:groupId', getLinksByGroup); 
router.patch('/:id', updateLink);
router.post('/check', checkLinkExists);
export default router;