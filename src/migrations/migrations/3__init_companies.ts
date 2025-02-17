import { Company } from "schemas/companies/company";

export async function initCompanies() {
  await Promise.all(
    dummyCompanies.map((company) =>
      new Company({
        ...company,
      }).save({ validateBeforeSave: false })
    )
  );
}

export const dummyCompanies = [
  {
    name: "AutoParts Express",
    address: "1234 Industrial Rd, Detroit, MI",
    phoneNum: "+15551234567",
  },
  {
    name: "Elite Car Components",
    address: "5678 Mechanics Ave, Los Angeles, CA",
    phoneNum: "+15559876543",
  },
];
