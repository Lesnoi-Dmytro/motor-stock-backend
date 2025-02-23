import { Type } from "@/schemas/items/Type";

export async function initTypes() {
  await Promise.all(
    basicTypes.map((type) => new Type(type).save({ validateBeforeSave: false }))
  );
}

export const basicTypes = [
  {
    name: "Fuel Injector",
  },
  {
    name: "Brake Caliper",
  },
  {
    name: "Shock Absorber",
  },
  {
    name: "Alternator",
  },
  {
    name: "Front Bumper Cover",
  },
];
