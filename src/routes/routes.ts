import { Router } from "express";
import authRoute from "routes/auth/routes";
import companiesRoute from "routes/companies/routes";
import itemsRoute from "routes/items/routes";
import usersRoute from "routes/users/routes";

const routes = Router();

routes.use("/auth", authRoute);
routes.use("/users", usersRoute);
routes.use("/items", itemsRoute);
routes.use("/companies", companiesRoute);

export default routes;
