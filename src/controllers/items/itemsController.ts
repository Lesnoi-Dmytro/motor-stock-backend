import type { Request, Response } from "express";
import type { PaginatedRequest } from "models/pagination";
import itemsService from "services/items/itemsService";

class ItemsController {
  public async getItems(req: Request, res: Response) {
    const query = req.query as PaginatedRequest;
    const articles = await itemsService.getItems(query);
    res.json(articles);
  }
}

const itemsController = new ItemsController();

export default itemsController;
