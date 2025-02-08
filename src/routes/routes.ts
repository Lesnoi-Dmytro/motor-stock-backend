import { Router } from "express";
import authRoute from "routes/auth/auth";

const routes = Router();

routes.use("/auth", authRoute);

export default routes;
