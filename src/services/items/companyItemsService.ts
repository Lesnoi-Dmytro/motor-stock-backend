import type { ICompanyItem } from "models/items/companyItem/companyItem";
import { PaginationResponse } from "./../../models/pagination";
import type { ItemFilters } from "models/items/companyItem/itemFilters";
import mongoose from "mongoose";
import { CompanyItem } from "schemas/items/companyItem";
import { startsWith } from "utils/reqex/regexUtils";
import type { createPriceHistoryItemRequest } from "models/items/companyItem/createPriceHistoryRequest";

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

  public async getItem(id: string): Promise<ICompanyItem | null> {
    const item = await CompanyItem.findOne({ _id: id })
      .populate({
        path: "item",
        populate: {
          path: "type",
        },
      })
      .populate("company")
      .lean();

    if (!item) {
      throw new Error("Item not found");
    }

    return item;
  }

  public async addPrice(id: string, price: createPriceHistoryItemRequest) {
    const item = await CompanyItem.findOneAndUpdate(
      { _id: id },
      {
        $push: {
          priceHistory: {
            price: price.price,
            date: price.date,
          },
        },
      },
      { new: true }
    ).lean();

    if (!item) {
      throw new Error("Item not found");
    }

    return item.priceHistory.at(-1);
  }

  public async deletePrice(id: string, priceId: string) {
    const item = await CompanyItem.findOneAndUpdate(
      { _id: id },
      {
        $pull: {
          priceHistory: {
            _id: priceId,
          },
        },
      },
      { new: true }
    ).lean();

    if (!item) {
      throw new Error("Item not found");
    }
  }

  public async updatePrice(
    id: string,
    priceId: string,
    price: createPriceHistoryItemRequest
  ) {
    const item = await CompanyItem.findById(id);
    if (!item) {
      throw new Error("Item not found");
    }

    const oldPrice = item.priceHistory.find(
      (price) => price._id.toString() === priceId
    );
    if (!oldPrice) {
      throw new Error("Price not found");
    }

    oldPrice.price = price.price;
    oldPrice.date = new Date(price.date);
    oldPrice.updatedAt = new Date();

    item.save();

    return oldPrice;
  }
}

const companyItemsService = new CompanyItemsService();

export default companyItemsService;
