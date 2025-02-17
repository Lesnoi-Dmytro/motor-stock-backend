import { dummyCompanies } from "migrations/migrations/3__init_companies";
import { basicItems } from "migrations/migrations/6__init_items";
import { Company } from "schemas/companies/company";
import { CompanyItem } from "schemas/items/companyItem";
import { Item } from "schemas/items/item";

export async function initCompanyItems() {
  const updatedItems = await Promise.all(
    basicCompanyItems.map(async (companyItem) => {
      const item = await Item.findOne({ name: companyItem.item.name }).lean();
      if (!item) {
        throw new Error(`Item ${companyItem.item.name} not found`);
      }
      const company = await Company.findOne({
        name: companyItem.company.name,
      }).lean();
      if (!company) {
        throw new Error(`Company ${companyItem.company.name} not found`);
      }

      return {
        ...companyItem,
        item,
        company,
      };
    })
  );

  await Promise.all(
    updatedItems.map((item) =>
      new CompanyItem({
        ...item,
      }).save({ validateBeforeSave: false })
    )
  );
}

const date = new Date(2025, 1, 1);
const nextMonth = new Date(new Date(date).setMonth(date.getMonth() + 1));

const basicCompanyItems = [
  {
    item: basicItems[0],
    company: dummyCompanies[0],
    priceHistory: [
      {
        price: 100,
        date,
      },
      {
        price: 110,
        date: nextMonth,
      },
    ],
  },
  {
    item: basicItems[1],
    company: dummyCompanies[0],
    priceHistory: [
      {
        price: 50,
        date,
      },
    ],
  },
  {
    item: basicItems[2],
    company: dummyCompanies[0],
    priceHistory: [
      {
        price: 70,
        date,
      },
    ],
  },
  {
    item: basicItems[3],
    company: dummyCompanies[0],
    priceHistory: [
      {
        price: 80.5,
        date,
      },
    ],
  },
  {
    item: basicItems[4],
    company: dummyCompanies[0],
    priceHistory: [
      {
        price: 75.5,
        date,
      },
    ],
  },
  {
    item: basicItems[5],
    company: dummyCompanies[0],
    priceHistory: [
      {
        price: 50,
        date,
      },
    ],
  },
  {
    item: basicItems[6],
    company: dummyCompanies[0],
    priceHistory: [
      {
        price: 110.5,
        date,
      },
    ],
  },
  {
    item: basicItems[7],
    company: dummyCompanies[0],
    priceHistory: [
      {
        price: 90,
        date,
      },
    ],
  },
  {
    item: basicItems[8],
    company: dummyCompanies[0],
    priceHistory: [
      {
        price: 100,
        date,
      },
    ],
  },
  {
    item: basicItems[9],
    company: dummyCompanies[0],
    priceHistory: [
      {
        price: 100,
        date,
      },
    ],
  },
  {
    item: basicItems[0],
    company: dummyCompanies[1],
    priceHistory: [
      {
        price: 100,
        date,
      },
    ],
  },
  {
    item: basicItems[1],
    company: dummyCompanies[1],
    priceHistory: [
      {
        price: 100,
        date,
      },
    ],
  },
  {
    item: basicItems[2],
    company: dummyCompanies[1],
    priceHistory: [
      {
        price: 100,
        date,
      },
    ],
  },
  {
    item: basicItems[3],
    company: dummyCompanies[1],
    priceHistory: [
      {
        price: 100,
        date,
      },
    ],
  },
  {
    item: basicItems[4],
    company: dummyCompanies[1],
    priceHistory: [
      {
        price: 100,
        date,
      },
    ],
  },
];
