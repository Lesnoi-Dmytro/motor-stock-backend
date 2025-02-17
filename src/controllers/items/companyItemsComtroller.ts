import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import type { ItemFilters, ItemFiltersRequest } from "models/items/itemFilters";
import companyItemsService from "services/items/companyItemsService";
import { stringOrUndefinedToArray } from "utils/arrays/stringToArray";

class CompanyItemsController {
  public async getItems(req: Request, res: Response, next: NextFunction) {
    try {
      const query: ItemFiltersRequest = req.query;
      const filters: ItemFilters = {
        page: Number(query.page) || 1,
        pageSize: Number(query.pageSize) || 12,
        search: query.search,
        companies: stringOrUndefinedToArray(query.companies),
        types: stringOrUndefinedToArray(query.types),
      };

      const items = await companyItemsService.getItems(filters);
      res.json(items);
    } catch (err: unknown) {
      console.error(err);
      next(createHttpError(400, (err as Error).message));
    }
  }
}

const companyItemsController = new CompanyItemsController();

export default companyItemsController;
