import { Router } from "express";
import authRoute from "routes/auth/auth";
import usersRoute from "routes/users/users";

const routes = Router();

routes.use("/auth", authRoute);
routes.use("/users", usersRoute);

export default routes;
