import { dummyCompanies } from "@/migrations/migrations/3__init_companies";
import { UserColors } from "@/models/users/user";
import { Company } from "@/schemas/companies/Company";
import { User } from "@/schemas/users/User";
import passwordEncodeService from "@/services/auth/passwordEncodeService";

export async function initCompanyUsers() {
  const company = await Company.findOne({
    name: companyUser.company,
  }).lean();

  if (!company) {
    throw new Error("Company not found");
  }

  await new User({
    ...companyUser,
    company,
    password: await passwordEncodeService.encode(companyUser.password),
  }).save({
    validateBeforeSave: false,
  });
}

const companyUser = {
  firstName: "Jane",
  lastName: "Doe",
  email: "autoparts@express.com",
  role: "SUPPLIER",
  password: "1234pass",
  company: dummyCompanies[0].name,
  color: UserColors.PINK,
};
