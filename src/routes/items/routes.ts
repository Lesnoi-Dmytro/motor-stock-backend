import typesController from "controllers/types/typesController";
import { Router } from "express";
import { authedMiddleware } from "middleware/authedMiddleware";

/**
 * @swagger
 * tags:
 *   name: Items
 *   description: Stock Items
 */
const itemsRoute = Router();
itemsRoute.use(authedMiddleware());

/**
 * @swagger
 * /api/items/types:
 *   get:
 *     tags: [Items]
 *     summary: Types
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
itemsRoute.get("/types", typesController.getAllTypes);

export default itemsRoute;
