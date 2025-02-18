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
 *         type: string
 *         description: Company ids
 *         example: '67b3bcb7afcacfc63f4417c7,67b3bcb7afcacfc63f4417c8'
 *       - in: query
 *         name: types
 *         type: string
 *         description: Item types ids
 *         example: '67b3bcccdba1d1ec070c5815,67b3bcccdba1d1ec070c5819'
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
 *                         example: 123456abcdef
 *                       item:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: 123456abcdef
 *                           name:
 *                             type: string
 *                             example: Fuel Injector
 *                           article:
 *                             type: string
 *                             example: FI-001
 *                           descriptiom:
 *                             type: string
 *                             exapmle: High-performance fuel injector.
 *                           type:
 *                             type: string
 *                             example: 123456abcdef
 *                           createdAt:
 *                             type: date
 *                             example: 2025-01-01T00:00:00.000Z
 *                           updatedAt:
 *                             type: date
 *                             example: 2025-01-01T00:00:00.000Z
 *                       company:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: 123456abcdef
 *                           name:
 *                             type: string
 *                             example: AutoParts Express
 *                           address:
 *                             type: string
 *                             example: 1234 Industrial Rd, Detroit, MI
 *                       quantity:
 *                         type: number
 *                         example: 10
 *                       priceHistory:
 *                         type: array
 *                         items: object
 *                         properties:
 *                           price:
 *                             type: number
 *                             example: 100
 *                           date:
 *                             type: date
 *                             example: 2025-01-01T00:00:00.000Z
 *                       createdAt:
 *                         type: date
 *                         example: 2025-01-01T00:00:00.000Z
 *                       updatedAt:
 *                         type: date
 *                         example: 2025-01-01T00:00:00.000Z
 *                 totalItems:
 *                   type: integer
 *                   example: 24
 */
itemsRoute.get(
  "/company-items",
  queryValidationMiddleware(companyItemsFilterSchema),
  companyItemsController.getItems
);

/**
 * @swagger
 * /api/items/company-items/{id}:
 *   get:
 *     tags: [Items]
 *     summary: Company Items
 *     description: Get paged company items, filtered by query
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         requered: true
 *         description: Company item id
 *         example: '67b4be14cc9f131fa745b758'
 *     responses:
 *       '200':
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 123456abcdef
 *                 item:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 123456abcdef
 *                     name:
 *                       type: string
 *                       example: Fuel Injector
 *                     article:
 *                       type: string
 *                       example: FI-001
 *                     descriptiom:
 *                       type: string
 *                       exapmle: High-performance fuel injector.
 *                     type:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: 123456abcdef
 *                         name:
 *                           type: string
 *                           example: Fuel Injector
 *                     createdAt:
 *                       type: date
 *                       example: 2025-01-01T00:00:00.000Z
 *                     updatedAt:
 *                       type: date
 *                       example: 2025-01-01T00:00:00.000Z
 *                   company:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 123456abcdef
 *                       name:
 *                         type: string
 *                         example: AutoParts Express
 *                       address:
 *                         type: string
 *                         example: 1234 Industrial Rd, Detroit, MI
 *                   quantity:
 *                     type: number
 *                     example: 10
 *                   priceHistory:
 *                     type: array
 *                     items: object
 *                     properties:
 *                       price:
 *                         type: number
 *                         example: 100
 *                       date:
 *                         type: date
 *                         example: 2025-01-01T00:00:00.000Z
 *                   createdAt:
 *                     type: date
 *                     example: 2025-01-01T00:00:00.000Z
 *                   updatedAt:
 *                     type: date
 *                     example: 2025-01-01T00:00:00.000Z
 */
itemsRoute.get("/company-items/:id", companyItemsController.getItem);

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
