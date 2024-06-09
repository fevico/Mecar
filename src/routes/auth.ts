import { Router } from "express";
import { create, generateForgetPasswordToken, resetPassword, sendProfile, signIn, updateUserProfile, verifyAuthToken, verifyForgetPasswordToken } from "src/controllers/auth";
import { isAuth } from "src/middleware/auth";
import validate from "src/middleware/validator";
import { userSchema, userloginSchema } from "src/utils/validationSchema";

const authRouter = Router()
authRouter.post('/sign-up', validate(userSchema), create)
authRouter.post('/verify-auth-token', verifyAuthToken)
authRouter.post('/sign-in', signIn)
authRouter.post('/forget-password', generateForgetPasswordToken)
authRouter.post('/verify-password-token', verifyForgetPasswordToken) 
authRouter.post('/reset-password', resetPassword) 
authRouter.put('/update-profile', isAuth, updateUserProfile)
authRouter.get('/profile', isAuth, sendProfile)

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Api endpoint to manage user auth
 */

/**
 * @swagger
 * tags:
 *   name: updateUser
 *   description: Api endpoint to update user's profile
 */
/**

/**
 * @swagger
 * /auth/sign-up:
 *   post:
 *     summary: Signup a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       "200":
 *         description: User token
 *       "400":
 *         description: Bad request
 *       "422":
 *         description: Unprocessed request
 *       "403":
 *         description: Unauthorized request
 *       "500":
 *         description: Internal server error
 */


/**
 * @swagger
 * /auth/verify-auth-token:
 *   post:
 *     summary: Verify auth token 
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true 
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               owner:
 *                 type: objectId
 *                 description: Owners token Id
 *               token:
 *                 type: string
 *                 description: token 
 *             required:
 *               - owner
 *                -token
 *     responses:
 *       "200":
 *         description: Token verified successfully
 *       "400":
 *         description: Bad request
 *       "422":
 *         description: Unprocessable request
 *       "403":
 *         description: Unauthorized request
 *       "500":
 *         description: Internal server error
 */

/**
 * @swagger
 * /auth/sign-in:
 *   post:
 *     summary: Sign in a user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true 
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: registered user's email
 *               password:
 *                 type: string
 *                 description: user's password
 *             required:
 *               - email
 *                -password
 *     responses:
 *       "200":
 *         description: Token verified successfully
 *       "400":
 *         description: Bad request
 *       "422":
 *         description: Unprocessable request
 *       "403":
 *         description: Unauthorized request
 *       "500":
 *         description: Internal server error
 */


/**
 * @swagger
 * /auth/forget-password:
 *   post:
 *     summary: Generate forget password token
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true 
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: registered user's email
 *             required:
 *               - email
 *     responses:
 *       "200":
 *         description: Token verified successfully
 *       "400":
 *         description: Bad request
 *       "422":
 *         description: Unprocessable request
 *       "403":
 *         description: Unauthorized request
 *       "500":
 *         description: Internal server error
 */

/**
 * @swagger
 * /auth/verify-password-token:
 *   post:
 *     summary: Verify forget password token 
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true 
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               owner:
 *                 type: objectId
 *                 description: Owners token Id
 *               token:
 *                 type: string
 *                 description: token 
 *             required:
 *               - owner
 *                -token
 *     responses:
 *       "200":
 *         description: Token verified successfully
 *       "400":
 *         description: Bad request
 *       "422":
 *         description: Unprocessable request
 *       "403":
 *         description: Unauthorized request
 *       "500":
 *         description: Internal server error
 */


/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset user's password 
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true 
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: objectId
 *                 description: Owners token Id
 *               password:
 *                 type: string
 *                 description: token 
 *             required:
 *               - id
 *                -password 
 *     responses:
 *       "200":
 *         description: Token verified successfully
 *       "400":
 *         description: Bad request
 *       "422":
 *         description: Unprocessable request
 *       "403":
 *         description: Unauthorized request
 *       "500":
 *         description: Internal server error
 */

/**
 * @swagger
 * /auth/update-profile:
 *   put:
 *     summary: Update user profile
 *     tags:
 *       - updateUser
 *     requestBody:
 *       required: true 
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/updateUser'
 *     responses:
 *       "200":
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Profile updated successfully
 *       "400":
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Bad request
 *       "422":
 *         description: Unprocessable request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unprocessable request
 *       "403":
 *         description: Unauthorized request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized request
 *       "500":
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */


/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Send users profile 
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true 
 *       content:
 *         application/json:
 *     responses:
 *       "200":
 *         description: Profile fetched successfully
 *       "400":
 *         description: Bad request
 *       "422":
 *         description: Unprocessable request
 *       "403":
 *         description: Unauthorized request
 *       "500":
 *         description: Internal server error
 */


export default authRouter;