import type { Request, Response } from "express";

class AuthController {
  async login(req: Request, res: Response) {
    res.send("login");
  }
}

const authController = new AuthController();

export default authController;
