import type { ICreateSupplyRequest } from "models/items/companyItem/supplies/createSupplyRequest";
import type { ISuppliesFilters } from "models/items/companyItem/supplies/suppliesFilters";
import type { ISupply } from "models/items/companyItem/supplies/supply";
import type { IUpdateSupplyRequest } from "models/items/companyItem/supplies/updateSupplyRequest";
import mongoose from "mongoose";
import { CompanyItem } from "schemas/items/companyItem";
import { Supply } from "schemas/items/supply";

class SuppliesService {
  public async getSupplies(query: ISuppliesFilters) {
    const { page, pageSize, item, sort } = query;

    const filter: mongoose.FilterQuery<ISupply> = {};

    if (item) {
      filter.item = new mongoose.Types.ObjectId(item);
    }

    const pipeline: mongoose.PipelineStage[] = [
      {
        $match: filter,
      },
    ];

    if (sort === "date") {
      pipeline.push({
        $sort: {
          date: -1,
        },
      });
    }

    const items = await Supply.aggregate([
      ...pipeline,
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
    const item = await CompanyItem.findById(
      new mongoose.Types.ObjectId(supply.item)
    );
    if (!item) {
      throw new Error("Item not found");
    }
    item.quantity += supply.quantity;
    await item.save();

    return await Supply.create(supply);
  }

  public async deleteSupply(id: string) {
    const res = await Supply.deleteOne({
      _id: new mongoose.Types.ObjectId(id),
    });
    if (res.deletedCount === 0) {
      throw new Error("Supply not found");
    }
  }

  public async updateSupply(id: string, supply: IUpdateSupplyRequest) {
    const res = await Supply.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      { $set: supply },
      { returnDocument: "before" }
    ).lean();

    if (!res) {
      throw new Error("Supply not found");
    }
    await CompanyItem.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(supply.item),
      },
      {
        $inc: { quantity: supply.quantity - res.quantity },
      }
    );

    return res;
  }
}

const suppliesService = new SuppliesService();

export default suppliesService;
