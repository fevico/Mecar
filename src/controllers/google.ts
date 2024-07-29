import { RequestHandler } from 'express';
import { OAuth2Client } from 'google-auth-library';
import userModel from 'src/model/user';
import jwt from "jsonwebtoken";


const redirectUrl = 'http://localhost:4000/oauth/callback';
// Ensure these environment variables are correctly set
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

if (!clientId || !clientSecret) {
  throw new Error('Missing CLIENT_ID or CLIENT_SECRET in environment variables');
}
const oAuth2Client = new OAuth2Client(clientId, clientSecret, redirectUrl);

const validRoles = ["mechanic", "carOwner", "admin"] as const;
type Role = typeof validRoles[number];

export const googleLogin: RequestHandler = (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Referrer-Policy', 'no-referrer-when-downgrade');

  const role = req.query.role as string; // Get the role from query parameters

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/userinfo.profile', 'openid'],
    prompt: 'consent',
    state: role // Pass the role as a state parameter
  });
  res.json({ url: authUrl });
};

export const oauthCallback: RequestHandler = async (req, res, next) => {
  try {
    const code = req.query.code as string;
    const role = req.query.state as string; // Retrieve the role from state parameter

    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);

    // const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokens.access_token}`);
    // const userData = await response.json();

    // Save user data to the database
    const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`
        }
      });
  
      const userInfo = await response.json();
  
      // Check if the user already exists in your database
      let user = await userModel.findOne({ email: userInfo.email });
      if (!user) {
        // Create a new user if they don't exist
        user = new userModel({
          firstName: userInfo.given_name,
          lastName: userInfo.family_name,
          email: userInfo.email,
          verified: true,
          googleId: userInfo.sub, // Save the Google ID
          role: role as Role
        });
        await user.save();
      }else {
        // Update the existing user's googleId if not already set
        if (!user.googleId) {
          user.googleId = userInfo.sub;
          user.role = role as Role; // Update the role
          await user.save();
        }
    }
  
      // Generate your own JWT tokens
      const accessToken = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET as string,
        { expiresIn: '15m' }
      );
  
      const refreshToken = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET as string
      );
  
      user.token = refreshToken;
      await user.save();
  
      res.json({
        profile: {
          id: user._id,
          email: user.email,
          role: user.role,
          verified: user.verified,
        },
        tokens: { refresh: refreshToken, access: accessToken },
      });
    } catch (error) {
      console.error('Error during OAuth callback:', error);
      res.status(500).json({ message: 'Authentication failed' });
    }
};
