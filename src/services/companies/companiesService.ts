import type { CreateCompanyRequest } from "models/companies/createCompanyRequest";
import { Company } from "schemas/companies/Company";

class CompaniesService {
  public async getAllCompanies() {
    return await Company.find().lean();
  }

  public async createCompany(company: CreateCompanyRequest) {
    return await Company.create(company);
  }
}

const companiesService = new CompaniesService();

export default companiesService;
