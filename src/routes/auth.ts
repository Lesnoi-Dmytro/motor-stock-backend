import { Router } from "express";
import createHttpError from "http-errors";

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication
 */
const authRoute = Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login
 *     description: Login user using email and password
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: credentials
 *         description: User credentials
 *         schema:
 *           type: object
 *           required: true
 *           properties:
 *             email:
 *               type: string
 *               description: User email
 *             password:
 *               type: string
 *               description: User password
 *         required: true
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
authRoute.post("/login", (req, res, next) => {
  next(createHttpError(403, "Invalid credentials"));
});

export default authRoute;
