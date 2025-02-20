import type { ICreateSupplyRequest } from "models/items/companyItem/supplies/createSupplyRequest";
import type { ISuppliesFilters } from "models/items/companyItem/supplies/suppliesFilters";
import type { ISupply } from "models/items/companyItem/supplies/supply";
import type { IUpdateSupplyRequest } from "models/items/companyItem/supplies/updateSupplyRequest";
import mongoose from "mongoose";
import { CompanyItem } from "schemas/items/companyItem";
import { Supply } from "schemas/items/supply";
import companyItemsService from "services/items/companyItemsService";

class SuppliesService {
  public async getSupplies(query: ISuppliesFilters) {
    const { page, pageSize, item } = query;

    const filter: mongoose.FilterQuery<ISupply> = {};

    if (item) {
      filter.item = new mongoose.Types.ObjectId(item);
    }

    const items = await Supply.aggregate([
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

  public async createSupply(supply: ICreateSupplyRequest) {
    const item = await CompanyItem.findById(supply.item).lean();
    if (!item) {
      throw new Error("Item not found");
    }
    const price = companyItemsService.getPriceByDate(item, supply.date);
    if (!price) {
      throw new Error("Price not found");
    }

    return await Supply.create({
      ...supply,
      price: price.price * supply.quantity,
    });
  }

  public async deleteSupply(id: string) {
    const res = await Supply.deleteOne({ _id: id });
    if (res.deletedCount === 0) {
      throw new Error("Supply not found");
    }
  }

  public async updateSupply(id: string, supply: IUpdateSupplyRequest) {
    const res = await Supply.findOneAndUpdate(
      { _id: id },
      { $set: supply }
    ).lean();

    if (!res) {
      throw new Error("Supply not found");
    }
    return res;
  }
}

const suppliesService = new SuppliesService();

export default suppliesService;
