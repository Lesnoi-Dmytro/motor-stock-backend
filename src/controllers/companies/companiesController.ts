import type { Request, Response } from "express";
import typesService from "services/items/typesService";

class TypesController {
  public async getAllTypes(req: Request, res: Response) {
    const types = await typesService.getAllTypes();

    res.json(types);
  }
}

const typesController = new TypesController();

export default typesController;
