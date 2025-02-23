import { basicCompanyItems } from "@/migrations/migrations/7__init_company_items";
import { CompanyItem } from "@/schemas/items/CompanyItem";
import { Supply } from "@/schemas/items/Supply";
import companyItemsService from "@/services/items/companyItemsService";

export async function initSupplies() {
  const updatedSupplies = await Promise.all(
    basicSupplies.map(async (supply) => {
      const item = await CompanyItem.aggregate([
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
          $match: {
            "item.name": supply.item.item.name,
            "company.name": supply.item.company.name,
          },
        },
      ]);
      if (!item[0]) {
        throw new Error(
          `Item ${supply.item.item.name} from ${supply.item.company.name} not found`
        );
      }
      const price = companyItemsService.getPriceByDate(item[0], supply.date);
      if (!price) {
        throw new Error(
          `Price for ${supply.item.item.name} from ${supply.item.company.name} not found`
        );
      }

      return {
        ...supply,
        item: item[0]._id,
        price: price.price * supply.quantity,
      };
    })
  );

  await Promise.all(
    updatedSupplies.map(async (supply) => {
      await new Supply(supply).save({ validateBeforeSave: false });
      await CompanyItem.findOneAndUpdate(
        { _id: supply.item._id },
        {
          $inc: { quantity: supply.quantity },
        }
      );
    })
  );
}

const date = new Date(2025, 1, 10);
const prevDay = new Date(new Date(date).setDate(date.getDate() - 1));

export const basicSupplies = [
  ...basicCompanyItems.flatMap((item) => [
    { item, quantity: 10, date },
    { item, quantity: 15, date: prevDay },
  ]),
];
