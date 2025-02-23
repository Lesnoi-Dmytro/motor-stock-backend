import { Router } from "express";
import { authedMiddleware } from "@/middleware/authedMiddleware";

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Users
 */
const usersRoute = Router();
usersRoute.use(authedMiddleware());

export default usersRoute;
