import type { IType } from "@/models/items/types/type";
import type { TypesFilters } from "@/models/items/types/typesFilters";
import mongoose from "mongoose";
import { Type } from "@/schemas/items/Type";
import { startsWith } from "@/utils/reqex/regexUtils";

class TypesService {
  public async getAllTypes(filters: TypesFilters) {
    const { page, pageSize, name, exclude } = filters;

    const filter: mongoose.FilterQuery<IType> = {};

    if (name) {
      filter.name = startsWith(name);
    }
    if (exclude) {
      filter._id = {
        $nin: exclude.map((id) => new mongoose.Types.ObjectId(id)),
      };
    }

    const items = await Type.aggregate([
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

  public async getTypesByIds(ids: string[]) {
    return await Type.find({ _id: { $in: ids } });
  }

  public async getTypeByName(name: string) {
    return await Type.findOne({ name });
  }

  public async createType(name: string) {
    return await Type.create({ name });
  }
}

const typesService = new TypesService();

export default typesService;
