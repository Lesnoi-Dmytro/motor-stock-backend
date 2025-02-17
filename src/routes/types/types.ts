import typesController from "controllers/types/typesController";
import { Router } from "express";
import { authedMiddleware } from "middleware/authedMiddleware";

/**
 * @swagger
 * tags:
 *   name: Types
 *   description: Items types
 */
const typesRoute = Router();
typesRoute.use(authedMiddleware());

/**
 * @swagger
 * /api/types:
 *   get:
 *     tags: [Types]
 *     summary: All types
 *     description: All item types
 *     responses:
 *       '200':
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 types:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 123abc
 *                       name:
 *                         type: string
 *                         example: Motor
 */
typesRoute.get("/", typesController.getAllTypes);

export default typesRoute;
