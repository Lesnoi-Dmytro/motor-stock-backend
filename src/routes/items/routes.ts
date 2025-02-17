import companyItemsController from "controllers/items/companyItemsComtroller";
import itemsController from "controllers/items/itemsController";
import typesController from "controllers/items/typesController";
import { Router } from "express";
import { authedMiddleware } from "middleware/authedMiddleware";
import { queryValidationMiddleware } from "middleware/validationMiddleware";
import { companyItemsFilterSchema } from "validation/items/companyItemsFilterValidationSchema";

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
 * /api/items/company-items:
 *   get:
 *     tags: [Items]
 *     summary: Company Items
 *     description: Get paged company items, filtered by query
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
 *         example: 12
 *       - in: query
 *         name: search
 *         type: string
 *         description: Part of a name or article
 *         example: 'Fuel'
 *       - in: query
 *         name: companies
 *         type: array
 *         items: string
 *         description: Company ids
 *         example: ['67b337fbd19581c05ed4171f', '67b337fbd19581c05ed41720']
 *       - in: query
 *         name: types
 *         type: array
 *         items: string
 *         description: Item types ids
 *         example: ['67b337fbd19581c05ed41729', '67b337fbd19581c05ed4172b']
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
itemsRoute.get(
  "/company-items",
  queryValidationMiddleware(companyItemsFilterSchema),
  companyItemsController.getItems
);

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

export default itemsRoute;
