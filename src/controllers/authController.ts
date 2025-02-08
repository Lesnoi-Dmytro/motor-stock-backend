import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import type { LoginRequest } from "models/auth/loginRequest";
import authService from "services/auth/authService";
import jwtService from "services/auth/jwtService";
import usersService from "services/users/usersService";

class AuthController {
  public async login(req: Request, res: Response, next: NextFunction) {
    const body: LoginRequest = req.body;

    try {
      const token = await authService.login(body.email, body.password);

      res.status(200).json({ token: jwtService.decodeToken(token) });
    } catch (error) {
      if (error instanceof Error && error.message === "Invalid credentials") {
        next(createHttpError(403, "Invalid credentials"));
      } else {
        next(error);
      }
    }
  }

  public async isEmailAvailable(req: Request, res: Response) {
    const email = req.body.email as string;
    const user = await usersService.getUserByEmail(email);

    return res.status(200).json({ available: !user });
  }
}

const authController = new AuthController();

export default authController;
