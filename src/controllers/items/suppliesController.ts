import type { Request, Response } from "express";
import type { ISuppliesRequestFilters } from "models/items/companyItem/supplies/suppliesFilters";
import suppliesService from "services/items/suppliesService";

class SuppliesController {
  public async getSupplies(req: Request, res: Response) {
    const {
      page = "1",
      pageSize = "10",
      item,
    } = req.query as ISuppliesRequestFilters;

    const items = await suppliesService.getSupplies({
      page: Number(page),
      pageSize: Number(pageSize),
      item,
    });
    res.json(items);
  }
}

const suppliesController = new SuppliesController();

export default suppliesController;
