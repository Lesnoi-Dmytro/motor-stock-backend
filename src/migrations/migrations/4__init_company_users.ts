import { dummyCompanies } from "migrations/migrations/3__init_companies";
import { UserColors } from "models/users/user";
import { Company } from "schemas/companies/company";
import { User } from "schemas/users/user";

export async function initCompanyUsers() {
  const dummyCompany = dummyCompanies[0];
  const company = await Company.findOne({
    name: dummyCompany.name,
  }).lean();

  if (!company) {
    throw new Error(`Company "${dummyCompany.name}" not found`);
  }

  await new User({
    firstName: "Jane",
    lastName: "Doe",
    email: "autoparts@express.com",
    role: "SUPPLIER",
    password: "password",
    company: company._id,
    color: UserColors.PINK,
  }).save({ validateBeforeSave: false });
}
