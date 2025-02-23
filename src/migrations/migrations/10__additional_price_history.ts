import { basicCompanyItems } from "@/migrations/migrations/7__init_company_items";
import { Company } from "@/schemas/companies/Company";
import { CompanyItem } from "@/schemas/items/CompanyItem";
import { Item } from "@/schemas/items/Item";

export async function additionalPriceHistory() {
  const initialDate = new Date(2025, 0, 1);
  const updateDates = Array.from({ length: 15 }).map((_, i) => {
    const date = new Date(initialDate);
    date.setMonth(date.getMonth() - (i + 1) * 2);
    return date;
  });

  const nextYearDate = new Date(initialDate);
  nextYearDate.setFullYear(nextYearDate.getFullYear() + 1);
  updateDates.push(nextYearDate);

  const updatedItems = await Promise.all(
    basicCompanyItems.map(async (companyItem) => {
      const item = await Item.findOne({ name: companyItem.item.name })
        .select("_id")
        .lean();
      if (!item) {
        throw new Error(`Item ${companyItem.item.name} not found`);
      }
      const company = await Company.findOne({
        name: companyItem.company.name,
      })
        .select("_id")
        .lean();
      if (!company) {
        throw new Error(`Company ${companyItem.company.name} not found`);
      }

      const savedCompanyItem = await CompanyItem.findOne({
        item: item._id,
        company: company._id,
      }).select("_id priceHistory");
      if (!savedCompanyItem) {
        throw new Error(`CompanyItem ${companyItem.item.name} not found`);
      }

      return savedCompanyItem;
    })
  );

  await Promise.all(
    updatedItems.map(async (item) => {
      const newPriceHistory = updateDates.map((date) => {
        return {
          price: Math.round(
            item.priceHistory[0].price * (1 + (Math.random() * 0.6 - 0.3))
          ),
          date,
        };
      });

      await CompanyItem.updateOne(
        { _id: item._id },
        { $push: { priceHistory: { $each: newPriceHistory } } }
      );
    })
  );
}
