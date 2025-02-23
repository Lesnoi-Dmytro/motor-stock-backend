import { Company } from "@/schemas/companies/Company";

export async function addAdditionalCompany() {
  await new Company(dummyNewCompany).save({ validateBeforeSave: false });
}

export const dummyNewCompany = {
  name: "NewParts Inc.",
  address: "1234 Industrial Rd, Detroit, MI",
  phoneNum: "+15541234567",
};
