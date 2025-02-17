import { Type } from "schemas/items/type";

export const types = [
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

export async function initTypes() {
  await Promise.all(
    types.map((type) =>
      new Type({
        ...type,
      }).save({ validateBeforeSave: false })
    )
  );
}
