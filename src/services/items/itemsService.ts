import type { ItemFilters } from "models/items/itemFilters";
import { Item } from "schemas/items/item";
import type { IItem } from "models/items/item";
import { startsWith } from "utils/reqex/regexUtils";
import mongoose from "mongoose";
import type { PaginationResponse } from "models/pagination";
import typesService from "services/items/typesService";
import type { ICreateItemRequest } from "models/items/itemCreateRequest";
import type { ItemsByCompanyFilters } from "models/items/itemsByCompanyFilters";
import type { ICompanyItem } from "models/items/companyItem/companyItem";
import { CompanyItem } from "schemas/items/companyItem";

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

  public async getItemsByCompany(
    id: string,
    filters: ItemsByCompanyFilters
  ): Promise<PaginationResponse<IItem>> {
    const { page, pageSize, article } = filters;

    const filter: mongoose.FilterQuery<ICompanyItem> = {};

    if (article) {
      filter["item.article"] = startsWith(article);
    }

    const items = await CompanyItem.aggregate([
      {
        $match: { item: new mongoose.Types.ObjectId(id) },
      },
      {
        $group: {
          _id: "$item",
        },
      },
      {
        $lookup: {
          from: "items",
          localField: "item",
          foreignField: "_id",
          as: "item",
        },
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
}

const itemsService = new ItemsService();

export default itemsService;
