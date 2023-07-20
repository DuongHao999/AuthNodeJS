import express from 'express';
import { getNewAcessToken } from '../app/controllers/RefreshToken.js';

const refreshTokenRouter = express.Router();

refreshTokenRouter.post('/new-access-token', getNewAcessToken);
// authRouter.post('/login', login);


export default refreshTokenRouter;