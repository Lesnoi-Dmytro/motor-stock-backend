import suppliesController from "controllers/items/suppliesController";
import { Router } from "express";
import { queryValidationMiddleware } from "middleware/validationMiddleware";
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

export default suppliesRoute;
