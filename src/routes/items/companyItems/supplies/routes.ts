import suppliesController from "controllers/items/suppliesController";
import { Router } from "express";
import {
  bodyValidationMiddleware,
  queryValidationMiddleware,
} from "middleware/validationMiddleware";
import {
  createSupplyRequestSchema,
  updateSupplyRequestSchema,
} from "validation/items/companyItems/supplies/createSupplyRequestValidationSchema";
import { suppliesFilterSchema } from "validation/items/companyItems/supplies/suppliesFilterValidationSchema";

/**
 * @swagger
 * tags:
 *   name: Supplies
 *   description: Item Supplies
 */
const suppliesRoute = Router();

/**
 * @swagger
 * /api/items/company-items/supplies:
 *   get:
 *     tags: [Supplies]
 *     summary: Supplies
 *     description: Get paginated item supplies, filtered by query
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
 *         name: item
 *         type: string
 *         description: Company item id
 *         example: 67b3bcb7afcacfc63f4417c7
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
 *                       item:
 *                         type: string
 *                         example: 123abc
 *                       quantity:
 *                         type: number
 *                         example: 10
 *                       date:
 *                         type: date
 *                         example: 2025-01-01T00:00:00.000Z
 *                       price:
 *                         type: number
 *                         example: 10.00
 *                       createdAt:
 *                         type: date
 *                         example: 2025-01-01T00:00:00.000Z
 *                       updatedAt:
 *                         type: date
 *                         example: 2025-01-01T00:00:00.000Z
 *                 totalItems:
 *                   type: number
 *                   example: 100
 */
suppliesRoute.get(
  "/",
  queryValidationMiddleware(suppliesFilterSchema),
  suppliesController.getSupplies
);

/**
 * @swagger
 * /api/items/company-items/supplies:
 *   post:
 *     tags: [Supplies]
 *     summary: Create Supply
 *     description: Create a new item supply
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           type: object
 *           properties:
 *             item:
 *               type: string
 *               example: 123abc
 *             quantity:
 *               type: number
 *               example: 10
 *             price:
 *               type: number
 *               example: 10.00
 *             date:
 *               type: date
 *               example: 2025-01-01T00:00:00.000Z
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
 *                   example: 123abc
 *                 item:
 *                   type: string
 *                   example: 123abc
 *                 quantity:
 *                   type: number
 *                   example: 10
 *                 date:
 *                   type: date
 *                   example: 2025-01-01T00:00:00.000Z
 *                 price:
 *                   type: number
 *                   example: 10.00
 *                 createdAt:
 *                   type: date
 *                   example: 2025-01-01T00:00:00.000Z
 *                 updatedAt:
 *                   type: date
 *                   example: 2025-01-01T00:00:00.000Z
 */
suppliesRoute.post(
  "/",
  bodyValidationMiddleware(createSupplyRequestSchema),
  suppliesController.createSupply
);

/**
 * @swagger
 * /api/items/company-items/supplies/{id}:
 *   delete:
 *     tags: [Supplies]
 *     summary: Delete Supply
 *     description: Delete a supply by id
 *     parameters:
 *       - in: query
 *         name: id
 *         type: string
 *         description: Supply id
 *         example: 67b3bcb7afcacfc63f4417c7
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
 *                   example: Supply deleted
 */
suppliesRoute.delete("/:id", suppliesController.deleteSupply);

/**
 * @swagger
 * /api/items/company-items/supplies/{id}:
 *   put:
 *     tags: [Supplies]
 *     summary: Update Supply
 *     description: Update a supply by id
 *     parameters:
 *       - in: query
 *         name: id
 *         type: string
 *         description: Supply id
 *         example: 67b3bcb7afcacfc63f4417c7
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           type: object
 *           properties:
 *             item:
 *               type: string
 *               example: 123abc
 *             quantity:
 *               type: number
 *               example: 10
 *             date:
 *               type: date
 *               example: 2025-01-01T00:00:00.000Z
 *             price:
 *               type: number
 *               example: 100.00
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
 *                   example: 123abc
 *                 item:
 *                   type: string
 *                   example: 123abc
 *                 quantity:
 *                   type: number
 *                   example: 10
 *                 date:
 *                   type: date
 *                   example: 2025-01-01T00:00:00.000Z
 *                 price:
 *                   type: number
 *                   example: 10.00
 *                 createdAt:
 *                   type: date
 *                   example: 2025-01-01T00:00:00.000Z
 *                 updatedAt:
 *                   type: date
 *                   example: 2025-01-01T00:00:00.000Z
 */
suppliesRoute.put(
  "/:id",
  bodyValidationMiddleware(updateSupplyRequestSchema),
  suppliesController.updateSupply
);

export default suppliesRoute;
