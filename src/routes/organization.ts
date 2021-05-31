import express,{Request,Response,NextFunction} from 'express';
import { createOrganization, deleteOrganization, getAllOrganization, getOrganization, updateOrganization } from '../controller/organization';
import verifyToken from '../middleware/auth';
const router = express.Router();

/* GET users listing. */
router.get('/',  getAllOrganization);
router.get('/:id', getOrganization);
router.post('/',verifyToken, createOrganization);
router.put('/:id',verifyToken, updateOrganization);
router.delete('/:id',verifyToken, deleteOrganization);

export default router;
