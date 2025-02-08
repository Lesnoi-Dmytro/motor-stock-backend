import { Router } from "express";

const authRoute = Router();

/**
 * @swagger
 * /auth/login:
 *   get:
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
authRoute.post("/login", (req, res) => {
  res.send("Login");
});

export default authRoute;
