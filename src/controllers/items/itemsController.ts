import type { Request, Response } from "express";
import type { ItemFiltersRequest } from "models/items/itemFilters";
import itemsService from "services/items/itemsService";

class ItemsController {
  public async getItems(req: Request, res: Response) {
    const {
      page = "1",
      pageSize = "10",
      article,
    } = req.query as ItemFiltersRequest;

    const items = await itemsService.getItems({
      page: Number(page),
      pageSize: Number(pageSize),
      article,
    });

    res.json(items);
  }
}

const itemsController = new ItemsController();

export default itemsController;
