import express from 'express';
import { deliveryBoy, login, register } from '../controllers/authController';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/deliveryboys', deliveryBoy)

export default router;
