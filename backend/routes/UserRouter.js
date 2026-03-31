import express from 'express';
import { register,login,logout} from '../controller/authController.js';

const router = express.Router();

// Register a new user
router.post('/register', register); 
// Login user
router.post('/login', login);

router.post("/logout", logout);

export default router;