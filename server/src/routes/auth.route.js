import express from 'express';
import { login, logout, signup } from '../controllers/auth.controller.js'; //always put .js at the end of the file name, otherwise it will not work

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);


export default router;