import type { Request, Response } from "express";
import type { TypesFiltersRequest } from "models/items/types/typesFilters";
import typesService from "services/items/typesService";
import { stringToArray } from "utils/arrays/stringToArray";

class TypesController {
  public async getAllTypes(req: Request, res: Response) {
    const {
      page = "1",
      pageSize = "10",
      name,
      ids,
    } = req.query as TypesFiltersRequest;
    if (ids) {
      const types = await typesService.getTypesByIds(stringToArray(ids));
      res.json({ items: types, totalItems: types.length });
    } else {
      const types = await typesService.getAllTypes({
        page: Number(page),
        pageSize: Number(pageSize),
        name,
      });
      res.json(types);
    }
  }
}

const typesController = new TypesController();

export default typesController;
