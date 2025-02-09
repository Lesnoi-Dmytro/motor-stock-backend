import authController from "controllers/authController";
import { Router } from "express";
import validationMiddleware from "middleware/validationMiddleware";
import { signInRequestSchema } from "validation/auth/signInValidationSchema";

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication
 */
const authRoute = Router();

/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     tags: [Auth]
 *     security: []
 *     summary: Login
 *     description: Login user using email and password
 *     consumes:
 *       - application/json
 *     requestBody:
 *       requeired: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User email
 *                 required: true
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 description: User password
 *                 required: true
 *                 example: password
 *     responses:
 *       '200':
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token
 *       '403':
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *               example:
 *                 message: Invalid credentials
 */
authRoute.post(
  "/signin",
  validationMiddleware(signInRequestSchema),
  authController.signIn
);

/**
 * @swagger
 * /api/auth/email/available:
 *   post:
 *     tags: [Auth]
 *     security: []
 *     summary: Email available
 *     description: Check if user email is not already registered
 *     consumes:
 *       - application/json
 *     requestBody:
 *       requeired: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User email
 *                 required: true
 *                 example: user@example.com
 *     responses:
 *       '200':
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 available:
 *                   type: boolean
 *                   description: Is email available
 */
authRoute.post("/email/available", (req, res) => {
  authController.isEmailAvailable(req, res);
});

export default authRoute;
