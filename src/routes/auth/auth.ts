import { Router } from "express";
import createHttpError from "http-errors";
import validationMiddleware from "middleware/validationMiddleware";
import { loginRequestSchema } from "validation/auth/loginValidationSchema";

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication
 */
const authRoute = Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login
 *     description: Login user using email and password
 *     consumes:
 *       - application/json
 *     requestBody:
 *       requeired: true
 *       name: credentials
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
 *         description: A successful response
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
  "/login",
  validationMiddleware(loginRequestSchema),
  (req, res, next) => {
    next(createHttpError(403, "Invalid credentials"));
  }
);

export default authRoute;
