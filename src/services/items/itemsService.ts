import type { ItemFilters } from "models/items/itemFilters";
import { Item } from "schemas/items/item";
import type { IItem } from "models/items/item";
import { startsWith } from "utils/reqex/regexUtils";
import type mongoose from "mongoose";
import type { PaginationResponse } from "models/pagination";
import typesService from "services/items/typesService";
import type { ICreateItemRequest } from "models/items/itemCreateRequest";

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
        $lookup: {
          from: "types",
          localField: "type",
          foreignField: "_id",
          as: "type",
        },
      },
      {
        $unwind: "$type",
      },
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

  public async getItemByArticle(article: string): Promise<IItem | null> {
    return await Item.findOne({ article }).lean();
  }

  public async createItem(item: ICreateItemRequest): Promise<IItem> {
    let type = await typesService.getTypeByName(item.type);
    if (!type) {
      type = await typesService.createType(item.type);
    }

    return await Item.create({
      ...item,
      type: type._id,
    });
  }
}

const itemsService = new ItemsService();

export default itemsService;
