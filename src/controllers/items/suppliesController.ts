import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import type { ICreateSupplyRequest } from "models/items/companyItem/supplies/createSupplyRequest";
import type { ISuppliesRequestFilters } from "models/items/companyItem/supplies/suppliesFilters";
import type { IUpdateSupplyRequest } from "models/items/companyItem/supplies/updateSupplyRequest";
import suppliesService from "services/items/suppliesService";

class SuppliesController {
  public async getSupplies(req: Request, res: Response) {
    const {
      page = "1",
      pageSize = "10",
      item,
      sort,
    } = req.query as ISuppliesRequestFilters;

    const items = await suppliesService.getSupplies({
      page: Number(page),
      pageSize: Number(pageSize),
      item,
      sort,
    });
    res.json(items);
  }

  public async createSupply(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as ICreateSupplyRequest;
      const item = await suppliesService.createSupply(body);
      res.json(item);
    } catch (error) {
      console.error(error);
      next(createHttpError(400, (error as Error).message));
    }
  }

  public async deleteSupply(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await suppliesService.deleteSupply(id);
      res.json({ message: "Supply deleted" });
    } catch (error) {
      console.error(error);
      next(createHttpError(400, (error as Error).message));
    }
  }

  public async updateSupply(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const body = req.body as IUpdateSupplyRequest;
      const supply = await suppliesService.updateSupply(id, body);
      res.json(supply);
    } catch (error) {
      console.error(error);
      next(createHttpError(400, (error as Error).message));
    }
  }
}

const suppliesController = new SuppliesController();

export default suppliesController;
