import { Router } from "express";
import authRoute from "routes/auth/auth";
import companiesRoute from "routes/companies/companies";
import typesRoute from "routes/types/types";
import usersRoute from "routes/users/users";

const routes = Router();

routes.use("/auth", authRoute);
routes.use("/users", usersRoute);
routes.use("/types", typesRoute);
routes.use("/companies", companiesRoute);

export default routes;
