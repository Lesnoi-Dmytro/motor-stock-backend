import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import type { IAuthedRequest } from "models/auth/authedRequest";
import type {
  ItemFilters,
  ItemFiltersRequest,
} from "models/items/companyItem/itemFilters";
import { Company } from "schemas/companies/company";
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

      const user = (req as IAuthedRequest).user;
      if (user.company) {
        const company = await Company.findOne({
          name: user.company,
        }).lean();

        if (!company) {
          next(createHttpError(403, "User company not found"));
          return;
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

  public async getItem(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const item = await companyItemsService.getItem(id);
      res.json(item);
    } catch (err: unknown) {
      console.error(err);
      next(createHttpError(400, (err as Error).message));
    }
  }

  public async addPrice(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const price = req.body;
      const priceHistory = await companyItemsService.addPrice(id, price);
      res.json(priceHistory);
    } catch (err: unknown) {
      console.error(err);
      next(createHttpError(400, (err as Error).message));
    }
  }

  public async deletePrice(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, priceId } = req.params;
      await companyItemsService.deletePrice(id, priceId);
      res.json({ message: "Price deleted" });
    } catch (err: unknown) {
      console.error(err);
      next(createHttpError(400, (err as Error).message));
    }
  }

  public async updatePrice(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, priceId } = req.params;
      const price = req.body;
      const updatedPrice = await companyItemsService.updatePrice(
        id,
        priceId,
        price
      );
      res.json(updatedPrice);
    } catch (err: unknown) {
      console.error(err);
      next(createHttpError(400, (err as Error).message));
    }
  }
}

const companyItemsController = new CompanyItemsController();

export default companyItemsController;
