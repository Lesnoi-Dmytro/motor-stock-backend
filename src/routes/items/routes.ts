import itemsController from "controllers/items/itemsController";
import typesController from "controllers/items/typesController";
import { Router } from "express";
import { authedMiddleware } from "middleware/authedMiddleware";
import companyItemsRoute from "routes/items/companyItems/routes";

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
 * /api/items:
 *   get:
 *     tags: [Items]
 *     summary: Items
 *     description: Get paginated items, filtered by query
 *     parameters:
 *       - in: query
 *         name: page
 *         type: integer
 *         description: Page number
 *         example: 1
 *       - in: query
 *         name: pageSize
 *         type: integer
 *         description: Page size
 *         example: 10
 *       - in: query
 *         name: article
 *         type: string
 *         description: Item article prefix
 *     responses:
 *       '200':
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 123abc
 *                       name:
 *                         type: string
 *                         example: Fuel Injector
 *                       article:
 *                         type: string
 *                         example: FI-001
 *                       description:
 *                         type: string
 *                         example: A fuel injector that injects fuel into an engine's combustion chamber.
 *                       type:
 *                         type: string
 *                         example: 123abc
 *                       createdAt:
 *                         type: date
 *                         example: 2025-01-01T00:00:00.000Z
 *                       updatedAt:
 *                         type: date
 *                         example: 2025-01-01T00:00:00.000Z
 *                 totalItems:
 *                   type: integer
 *                   example: 10
 */
itemsRoute.get("/", itemsController.getItems);

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
 *                         example: Fuel Injector
 */
itemsRoute.get("/types", typesController.getAllTypes);

itemsRoute.use("/company-items", companyItemsRoute);

export default itemsRoute;
