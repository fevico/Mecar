import { Router } from 'express';
import { googleLogin, oauthCallback } from 'src/controllers/google';

const oauthRouter = Router();

oauthRouter.get('/auth', googleLogin); // Generates the Google authentication URL
oauthRouter.get('/callback', oauthCallback); // Handles the Google OAuth2 callback


export default oauthRouter;
