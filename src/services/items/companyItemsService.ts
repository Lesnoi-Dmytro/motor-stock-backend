import type { ICompanyItem } from "models/items/companyItem";
import { PaginationResponse } from "./../../models/pagination";
import type { ItemFilters } from "models/items/itemFilters";
import mongoose from "mongoose";
import { CompanyItem } from "schemas/items/companyItem";
import { startsWith } from "utils/reqex/regexUtils";

class CompanyItemsService {
  public async getItems(
    filters: ItemFilters
  ): Promise<PaginationResponse<ICompanyItem>> {
    const { page, pageSize, search, companies, types } = filters;

    const filter: mongoose.FilterQuery<ICompanyItem> = {};
    if (search) {
      filter["$or"] = [
        { "item.name": { $regex: new RegExp(search, "i") } },
        { "item.article": { $regex: startsWith(search) } },
      ];
    }
    if (companies) {
      filter["company._id"] = {
        $in: companies.map((company) => new mongoose.Types.ObjectId(company)),
      };
    }
    if (types) {
      filter["item.type"] = {
        $in: types.map((type) => new mongoose.Types.ObjectId(type)),
      };
    }

    const items = await CompanyItem.aggregate([
      {
        $lookup: {
          from: "items",
          localField: "item",
          foreignField: "_id",
          as: "item",
        },
      },
      {
        $lookup: {
          from: "companies",
          localField: "company",
          foreignField: "_id",
          as: "company",
        },
      },
      {
        $unwind: "$item",
      },
      {
        $unwind: "$company",
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
      totalItems: items[0].metadata[0]?.totalItems,
    };
  }
}

const companyItemsService = new CompanyItemsService();

export default companyItemsService;
