import type { ISuppliesFilters } from "models/items/companyItem/supplies/suppliesFilters";
import type { ISupply } from "models/items/companyItem/supplies/supply";
import mongoose from "mongoose";
import { Supply } from "schemas/items/supply";

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
}

const suppliesService = new SuppliesService();

export default suppliesService;
