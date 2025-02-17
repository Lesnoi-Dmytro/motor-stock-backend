import type { PaginatedRequest } from "models/pagination";
import { Item } from "schemas/items/item";

class ItemsService {
  public async getItems(query: PaginatedRequest) {
    console.log(query);
    const items = await Item.find({});
    return items;
  }
}

const itemsService = new ItemsService();

export default itemsService;
