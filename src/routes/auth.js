import express from 'express';
import { login, signUp } from '../app/controllers/AuthControllers.js';

const authRouter = express.Router();

authRouter.post('/sign-up', signUp);
authRouter.post('/login', login);


export default authRouter;