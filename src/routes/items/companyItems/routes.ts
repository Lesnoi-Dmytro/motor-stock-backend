import companyItemsController from "controllers/items/companyItemsController";
import { Router } from "express";
import {
  bodyValidationMiddleware,
  queryValidationMiddleware,
} from "middleware/validationMiddleware";
import suppliesRoute from "routes/items/companyItems/supplies/routes";
import { companyItemsFilterSchema } from "validation/items/companyItems/companyItemsFilterValidationSchema";
import { createPriceHistoryItemRequestSchema } from "validation/items/companyItems/createPriceHistoryItemRequestValidationSchema";

/**
 * @swagger
 * tags:
 *   name: CompanyItems
 *   description: Stock Company Items
 */
const companyItemsRoute = Router();
companyItemsRoute.use("/supplies", suppliesRoute);

/**
 * @swagger
 * /api/items/company-items:
 *   get:
 *     tags: [CompanyItems]
 *     summary: Company Items
 *     description: Get paginated company items, filtered by query
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
companyItemsRoute.get(
  "/",
  queryValidationMiddleware(companyItemsFilterSchema),
  companyItemsController.getItems
);

/**
 * @swagger
 * /api/items/company-items/{id}:
 *   get:
 *     tags: [CompanyItems]
 *     summary: Company Items
 *     description: Get company item by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
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
companyItemsRoute.get("/:id", companyItemsController.getItem);

/**
 * @swagger
 * /api/items/company-items/{id}:
 *   delete:
 *     tags: [CompanyItems]
 *     summary: Delete Company Items
 *     description: Delete company item by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
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
 *                 message:
 *                   type: string
 *                   example: Company Item deleted
 */
companyItemsRoute.delete("/:id", companyItemsController.deleteItem);

/**
 * @swagger
 * /api/items/company-items/{id}/price:
 *   post:
 *     tags: [CompanyItems]
 *     summary: Add item price
 *     description: Add price to company item
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Company item id
 *         example: '67b4be14cc9f131fa745b758'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               price:
 *                 type: number
 *                 description: New price value
 *                 required: true
 *                 example: 100.00
 *               date:
 *                 type: date
 *                 description: Date of price change
 *                 required: true
 *                 example: 2025-04-01T00:00:00.000Z
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
 *                 price:
 *                   type: number
 *                   example: 100.00
 *                 date:
 *                   type: date
 *                   example: 2025-01-01T00:00:00.000Z
 *                 createdAt:
 *                   type: date
 *                   example: 2025-01-01T00:00:00.000Z
 *                 updatedAt:
 *                   type: date
 *                   example: 2025-01-01T00:00:00.000Z
 */
companyItemsRoute.post(
  "/:id/price",
  bodyValidationMiddleware(createPriceHistoryItemRequestSchema),
  companyItemsController.addPrice
);

/**
 * @swagger
 * /api/items/company-items/price/{id}:
 *   delete:
 *     tags: [CompanyItems]
 *     summary: Delete item price
 *     description: Delete price of a company item
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Company Item id
 *         example: '67b4be14cc9f131fa745b758'
 *       - in: path
 *         name: priceId
 *         schema:
 *           type: string
 *         required: true
 *         description: Price id
 *         example: '67b4be14cc9f131fa745b758'
 *     responses:
 *       '200':
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Price deleted
 */
companyItemsRoute.delete(
  "/:id/price/:priceId",
  companyItemsController.deletePrice
);

/**
 * @swagger
 * /api/items/company-items/{id}/price/{priceId}:
 *   put:
 *     tags: [CompanyItems]
 *     summary: Update item price
 *     description: Update price of a company item
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Company Item id
 *         example: '67b4be14cc9f131fa745b758'
 *       - in: path
 *         name: priceId
 *         schema:
 *           type: string
 *         required: true
 *         description: Price id
 *         example: '67b4be14cc9f131fa745b758'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               price:
 *                 type: number
 *                 description: New price value
 *                 required: true
 *                 example: 100.00
 *               date:
 *                 type: date
 *                 description: Date of price change
 *                 required: true
 *                 example: 2025-04-01T00:00:00.000Z
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
 *                 price:
 *                   type: number
 *                   example: 100.00
 *                 date:
 *                   type: date
 *                   example: 2025-01-01T00:00:00.000Z
 *                 createdAt:
 *                   type: date
 *                   example: 2025-01-01T00:00:00.000Z
 *                 updatedAt:
 *                   type: date
 *                   example: 2025-01-01T00:00:00.000Z
 */
companyItemsRoute.put(
  "/:id/price/:priceId",
  bodyValidationMiddleware(createPriceHistoryItemRequestSchema),
  companyItemsController.updatePrice
);

export default companyItemsRoute;
