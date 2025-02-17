import { Type } from "schemas/items/Type";

class TypesService {
  public async getAllTypes() {
    return await Type.find().lean();
  }

  public async createType(name: string) {
    return await Type.create({ name });
  }
}

const typesService = new TypesService();

export default typesService;
