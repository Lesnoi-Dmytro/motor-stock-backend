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
 *     summary: Items Articles
 *     description: Get paged items, filtered by query
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
