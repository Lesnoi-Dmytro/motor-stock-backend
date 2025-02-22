import type { Request, Response } from "express";
import type { ItemFiltersRequest } from "models/items/itemFilters";
import type { ItemsByCompanyFiltersRequest } from "models/items/itemsByCompanyFilters";
import itemsService from "services/items/itemsService";

class ItemsController {
  public async getItems(req: Request, res: Response) {
    const {
      page = "1",
      pageSize = "10",
      article,
    } = req.query as ItemFiltersRequest;

    const itemsPage = await itemsService.getItems({
      page: Number(page),
      pageSize: Number(pageSize),
      article,
    });

    res.json(itemsPage);
  }

  public getItemsByCompany(req: Request, res: Response) {
    const { id } = req.params;
    const {
      page = "1",
      pageSize = "10",
      article,
    } = req.query as ItemsByCompanyFiltersRequest;

    const itemsPage = itemsService.getItemsByCompany(id, {
      page: Number(page),
      pageSize: Number(pageSize),
      article,
    });

    res.json(itemsPage);
  }
}

const itemsController = new ItemsController();

export default itemsController;
