import {Router} from 'express';

import { createGroup, getGroups, updateGroup, deleteGroup } from '../controllers/group.controller.js';


const router = Router();

router.post('/', createGroup);
router.get('/', getGroups);
router.patch('/:id', updateGroup);
router.delete('/:id', deleteGroup);


export const groupRoute = router;