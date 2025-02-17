import typesController from "controllers/types/typesController";
import { Router } from "express";
import { authedMiddleware } from "middleware/authedMiddleware";
import { UserRole } from "models/users/User";

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
 *     description: All registered companies
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
 *                         example: Motor Stock
 *                       address:
 *                         type: string
 *                         example: Ukrain, Lviv, 123 Main St
 *                       phoneNum:
 *                         type: string
 *                         example: +380123456789
 */
companiesRoute.get("/", typesController.getAllTypes);

export default companiesRoute;
