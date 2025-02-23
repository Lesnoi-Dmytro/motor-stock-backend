import { basicTypes } from "@/migrations/migrations/5__init_item_types";
import { Item } from "@/schemas/items/Item";
import { Type } from "@/schemas/items/Type";

export async function initItems() {
  const updatedItems = await Promise.all(
    basicItems.map(async (item) => {
      const type = await Type.findOne({ name: item.type });
      if (!type) {
        throw new Error(`Type ${item.type} not found`);
      }

      return {
        ...item,
        type: type ? type._id : null,
      };
    })
  );

  await Promise.all(
    updatedItems.map((item) =>
      new Item(item).save({ validateBeforeSave: false })
    )
  );
}

export const basicItems = [
  {
    name: "Fuel Injector v1",
    article: "FI-001",
    description: "High-performance fuel injector.",
    type: basicTypes[0].name,
  },
  {
    name: "Brake Caliper v1",
    article: "BC-002",
    description: "Heavy-duty brake caliper for high-performance cars.",
    type: basicTypes[1].name,
  },
  {
    name: "Shock Absorber v1",
    article: "SA-003",
    description: "Shock absorber for smooth rides.",
    type: basicTypes[2].name,
  },
  {
    name: "Alternator v1",
    article: "AL-004",
    description: "Car alternator for reliable power generation.",
    type: basicTypes[3].name,
  },
  {
    name: "Front Bumper Cover v1",
    article: "FBC-005",
    description: "Front bumper cover for car protection.",
    type: basicTypes[4].name,
  },
  {
    name: "Fuel Injector v2",
    article: "FI-006",
    description:
      "Updated high-performance fuel injector for high-efficiency engines.",
    type: basicTypes[0].name,
  },
  {
    name: "Fuel Injector v3",
    article: "FI-007",
    description: "New generation fuel injector with enhanced fuel atomization.",
    type: basicTypes[0].name,
  },
  {
    name: "Fuel Injector v4",
    article: "FI-008",
    description:
      "Advanced fuel injector designed for improved engine performance.",
    type: basicTypes[0].name,
  },
  {
    name: "Fuel Injector v5",
    article: "FI-009",
    description: "High-performance fuel injector with optimized fuel flow.",
    type: basicTypes[0].name,
  },
  {
    name: "Fuel Injector v6",
    article: "FI-010",
    description: "Ultra-efficient fuel injector for power and fuel savings.",
    type: basicTypes[0].name,
  },
];
