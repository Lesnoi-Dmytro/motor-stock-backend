import type { ItemFilters } from "models/items/itemFilters";
import { Item } from "schemas/items/item";
import type { IItem } from "models/items/item";
import { startsWith } from "utils/reqex/regexUtils";
import type mongoose from "mongoose";
import type { PaginationResponse } from "models/pagination";

class ItemsService {
  public async getItems(
    query: ItemFilters
  ): Promise<PaginationResponse<IItem>> {
    const { page, pageSize, article } = query;

    const filter: mongoose.FilterQuery<IItem> = {};

    if (article) {
      filter.article = startsWith(article);
    }

    const items = await Item.aggregate([
      {
        $match: filter,
      },
      {
        $facet: {
          metadata: [{ $count: "totalItems" }],
          data: [{ $skip: (page - 1) * pageSize }, { $limit: pageSize }],
        },
      },
    ]);

    return {
      items: items[0].data,
      totalItems: items[0].metadata[0]?.totalItems || 0,
    };
  }
}

const itemsService = new ItemsService();

export default itemsService;
