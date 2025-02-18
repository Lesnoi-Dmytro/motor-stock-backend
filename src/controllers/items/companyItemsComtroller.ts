import type { NextFunction, Response } from "express";
import createHttpError from "http-errors";
import type { IAuthedRequest } from "models/auth/authedRequest";
import type { ItemFilters, ItemFiltersRequest } from "models/items/itemFilters";
import { Company } from "schemas/companies/company";
import companyItemsService from "services/items/companyItemsService";
import { stringOrUndefinedToArray } from "utils/arrays/stringToArray";

class CompanyItemsController {
  public async getItems(
    req: IAuthedRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const query: ItemFiltersRequest = req.query;
      const filters: ItemFilters = {
        page: Number(query.page) || 1,
        pageSize: Number(query.pageSize) || 12,
        search: query.search,
        companies: stringOrUndefinedToArray(query.companies),
        types: stringOrUndefinedToArray(query.types),
      };

      if (req.user.company) {
        const company = await Company.findOne({
          name: req.user.company,
        }).lean();

        if (!company) {
          return next(createHttpError(403, "User company not found"));
        }
        filters.companies = [company._id.toString()];
      }

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
