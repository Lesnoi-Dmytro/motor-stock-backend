import itemsController from "controllers/items/itemsController";
import typesController from "controllers/items/typesController";
import { Router } from "express";
import { authedMiddleware } from "middleware/authedMiddleware";
import { queryValidationMiddleware } from "middleware/validationMiddleware";
import companyItemsRoute from "routes/items/companyItems/routes";
import { itemsByCompanyFilterSchema } from "validation/items/itemsByCompanyFiltersValidationSchema";
import { itemsFilterSchema } from "validation/items/itemsFiltersValidationSchema";
import { typesFilterSchema } from "validation/items/types/typesFiltersValidationSchema";

/**
 * @swagger
 * tags:
 *   name: Items
 *   description: Stock Items
 */
const itemsRoute = Router();
itemsRoute.use(authedMiddleware());
itemsRoute.use("/company-items", companyItemsRoute);

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
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: 123abc
 *                           name:
 *                             type: string
 *                             example: Fuel Injector
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
itemsRoute.get(
  "/",
  queryValidationMiddleware(itemsFilterSchema),
  itemsController.getItems
);

/**
 * @swagger
 * /api/items/company/{id}:
 *   get:
 *     tags: [Items]
 *     summary: Items by company
 *     description: Get paginated items from a company, filtered by query
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Company id
 *         type: string
 *         example: 123abc
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
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: 123abc
 *                           name:
 *                             type: string
 *                             example: Fuel Injector
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
itemsRoute.get(
  "/company/:id",
  queryValidationMiddleware(itemsByCompanyFilterSchema),
  itemsController.getItemsByCompany
);

/**
 * @swagger
 * /api/items/types:
 *   get:
 *     tags: [Items]
 *     summary: Types
 *     description: Paginaged item types, filtered by query
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
 *         name: name
 *         type: string
 *         description: Type name prefix
 *         example: Fuel
 *       - in: query
 *         name: exclude
 *         type: string
 *         description: Type ids to exclude
 *         example: 123abc,456def
 *       - in: query
 *         name: ids
 *         type: string
 *         description: Type ids
 *         example: 123abc,456def
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
 *                 totalItems:
 *                   type: integer
 *                   example: 10
 */
itemsRoute.get(
  "/types",
  queryValidationMiddleware(typesFilterSchema),
  typesController.getAllTypes
);

export default itemsRoute;
