import companiesController from "@/controllers/companies/companiesController";
import { Router } from "express";
import { authedMiddleware } from "@/middleware/authedMiddleware";
import {
  bodyValidationMiddleware,
  queryValidationMiddleware,
} from "@/middleware/validationMiddleware";
import { UserRole } from "@/models/users/user";
import { companiesByItemFilterSchema } from "@/validation/companies/companiesByItemFiltersValidationSchema";
import { companiesFilterSchema } from "@/validation/companies/companiesFiltersValidationSchema copy";
import { createCompanySchema } from "@/validation/companies/createCompanyValidationSchema";
import { updateCompanySchema } from "@/validation/companies/updateCompanyValidationSchema";

/**
 * @swagger
 * tags:
 *   name: Companies
 *   description: Companies
 */
const companiesRoute = Router();
companiesRoute.use(authedMiddleware([UserRole.EMPLOYEE]));

/**
 * @swagger
 * /api/companies:
 *   get:
 *     tags: [Companies]
 *     summary: All companies
 *     description: Paginated companies, filtered by query
 *     parameters:
 *       - in: query
 *         name: page
 *         description: Page number
 *         type: number
 *         example: 1
 *       - in: query
 *         name: pageSize
 *         description: Page size
 *         type: number
 *         example: 10
 *       - in: query
 *         name: name
 *         description: Company name prefix
 *         type: string
 *         example: Auto
 *       - in: query
 *         name: exclude
 *         description: Company ids to exclude
 *         type: string
 *         example: 123abc,456def
 *       - in: query
 *         name: ids
 *         type: string
 *         description: Company ids
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
 *                         example: Motor Stock
 *                       address:
 *                         type: string
 *                         example: Ukrain, Lviv, 123 Main St
 *                       phoneNum:
 *                         type: string
 *                         example: +380123456789
 *                 totalItems:
 *                   type: integer
 *                   example: 10
 */
companiesRoute.get(
  "/",
  queryValidationMiddleware(companiesFilterSchema),
  companiesController.getAllCompanies
);

/**
 * @swagger
 * /api/companies/item/{id}:
 *   get:
 *     tags: [Companies]
 *     summary: Companies with item
 *     description: Paginated companies, that have item with specified id, filtered by query
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Item id
 *         type: string
 *         example: 123abc
 *       - in: query
 *         name: page
 *         description: Page number
 *         type: number
 *         example: 1
 *       - in: query
 *         name: pageSize
 *         description: Page size
 *         type: number
 *         example: 10
 *       - in: query
 *         name: name
 *         description: Company name prefix
 *         type: string
 *         example: Auto
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
 *                         example: Motor Stock
 *                       address:
 *                         type: string
 *                         example: Ukrain, Lviv, 123 Main St
 *                       phoneNum:
 *                         type: string
 *                         example: +380123456789
 *                 totalItems:
 *                   type: integer
 *                   example: 10
 */
companiesRoute.get(
  "/item/:id",
  queryValidationMiddleware(companiesByItemFilterSchema),
  companiesController.getCompaniesByItem
);

/**
 * @swagger
 * /api/companies:
 *   post:
 *     tags: [Companies]
 *     summary: Create company
 *     description: Create a new company
 *     responseBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: New Company Name
 *               address:
 *                 type: string
 *                 example: Ukrain, Lviv, 123 Main St
 *               phoneNum:
 *                 type: string
 *                 example: +380123456789
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
 *                 name:
 *                   type: string
 *                   example: Motor Stock
 *                 address:
 *                   type: string
 *                   example: Ukrain, Lviv, 123 Main St
 *                 phoneNum:
 *                   type: string
 *                   example: +380123456789
 */
companiesRoute.post(
  "/",
  bodyValidationMiddleware(createCompanySchema),
  companiesController.createCompany
);

/**
 * @swagger
 * /api/companies/{id}:
 *   put:
 *     tags: [Companies]
 *     summary: Update company
 *     description: Update a company
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Company id
 *         type: string
 *         example: 123abc
 *     responseBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: New Company Name
 *               address:
 *                 type: string
 *                 example: Ukrain, Lviv, 123 Main St
 *               phoneNum:
 *                 type: string
 *                 example: +380123456789
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
 *                 name:
 *                   type: string
 *                   example: Motor Stock
 *                 address:
 *                   type: string
 *                   example: Ukrain, Lviv, 123 Main St
 *                 phoneNum:
 *                   type: string
 *                   example: +380123456789
 */
companiesRoute.put(
  "/:id",
  bodyValidationMiddleware(updateCompanySchema),
  companiesController.updateCompany
);

/**
 * @swagger
 * /api/companies/{id}:
 *   delete:
 *     tags: [Companies]
 *     summary: Delete company
 *     description: Delete a company
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Company id
 *         type: string
 *         example: 123abc
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
 *                   example: Company deleted
 */
companiesRoute.delete("/:id", companiesController.deleteCompany);

export default companiesRoute;
