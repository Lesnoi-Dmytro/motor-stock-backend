import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import type { ItemFilters } from "models/items/itemFilters";
import companyItemsService from "services/items/companyItemsService";

class CompanyItemsController {
  public async getItems(req: Request, res: Response, next: NextFunction) {
    try {
      const query: ItemFilters = req.query;
      const items = await companyItemsService.getItems(query);
      res.json(items);
    } catch (err: unknown) {
      console.error(err);
      next(createHttpError(400, (err as Error).message));
    }
  }
}

const companyItemsController = new CompanyItemsController();

export default companyItemsController;
