import type { ICompanyItem } from "models/items/companyItem";
import { PaginationResponse } from "./../../models/pagination";
import type { ItemFilters } from "models/items/itemFilters";
import mongoose from "mongoose";
import { startsWith } from "utils/reqex/regexUtils";
import { CompanyItem } from "schemas/items/companyItem";

class CompanyItemsService {
  public async getItems(
    filters: ItemFilters
  ): Promise<PaginationResponse<ICompanyItem>> {
    const {
      page: pageStr = 1,
      pageSize: pageSizeStr = 12,
      search,
      companies,
      types,
    } = filters;
    const page = Number(pageStr);
    const pageSize = Number(pageSizeStr);

    const filter: mongoose.FilterQuery<ICompanyItem> = {};
    if (search) {
      filter["$or"] = [
        { name: { $regex: new RegExp(search, "i") } },
        { article: { $regex: startsWith(search) } },
      ];
    }
    if (companies) {
      if (!Array.isArray(companies)) {
        throw new Error("companies must be an array");
      }
      filter.company = {
        $in: companies.map((company) => new mongoose.Types.ObjectId(company)),
      };
    }
    if (types) {
      if (!Array.isArray(types)) {
        throw new Error("types must be an array");
      }
      filter["item.type"] = { $in: types };
    }

    const items = await CompanyItem.find()
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .lean();

    return {
      items,
      totalPages: Math.ceil(
        (await CompanyItem.countDocuments(filter)) / pageSize
      ),
    };
  }
}

const companyItemsService = new CompanyItemsService();

export default companyItemsService;
