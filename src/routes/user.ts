import express,{Request,Response,NextFunction} from 'express';
import { createUser, deleteUser, getAllUsers, getOneUser,loginUser, updatedUser} from '../controller/user';
const router = express.Router();

router.get('/:id', getOneUser)
router.get('/', getAllUsers)
router.post('/register', createUser)
router.post('/login', loginUser)
router.put('/:id', updatedUser)
router.delete('/:id', deleteUser)



export default router;
