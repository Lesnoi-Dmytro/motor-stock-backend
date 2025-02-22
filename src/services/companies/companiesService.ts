import type { ICompaniesByItemFilters } from "models/companies/companiesByItemFilters";
import type { ICompaniesFilters } from "models/companies/companiesFilters";
import type { CreateCompanyRequest } from "models/companies/createCompanyRequest";
import type { ICompanyItem } from "models/items/companyItem/companyItem";
import mongoose from "mongoose";
import { Company } from "schemas/companies/company";
import { CompanyItem } from "schemas/items/companyItem";
import { startsWith } from "utils/reqex/regexUtils";

class CompaniesService {
  public async getAllCompanies(filters: ICompaniesFilters) {
    const { page, pageSize, name, exclude } = filters;

    const filter: mongoose.FilterQuery<ICompanyItem> = {};

    if (name) {
      filter.name = startsWith(name);
    }
    if (exclude) {
      filter._id = {
        $nin: exclude.map((id) => new mongoose.Types.ObjectId(id)),
      };
    }

    const items = await Company.aggregate([
      {
        $match: filter,
      },
      {
        $facet: {
          metadata: [{ $count: "totalItems" }],
          data: [{ $skip: (page - 1) * pageSize }, { $limit: pageSize }],
        },
      },
    ]);

    return {
      items: items[0].data,
      totalItems: items[0].metadata[0]?.totalItems || 0,
    };
  }

  public async getCompaniesByIds(ids: string[]) {
    const companies = await Company.find({ _id: { $in: ids } });
    return companies;
  }

  public async createCompany(company: CreateCompanyRequest) {
    return await Company.create(company);
  }

  public async getCompaniesByItem(
    id: string,
    filters: ICompaniesByItemFilters
  ) {
    const { page, pageSize, name } = filters;

    const filter: mongoose.FilterQuery<ICompanyItem> = {};

    if (name) {
      filter["company.name"] = startsWith(name);
    }

    const items = await CompanyItem.aggregate([
      {
        $match: { item: new mongoose.Types.ObjectId(id) },
      },
      {
        $group: {
          _id: "$company",
        },
      },
      {
        $lookup: {
          from: "companies",
          localField: "company",
          foreignField: "_id",
          as: "company",
        },
      },
      {
        $match: filter,
      },
      {
        $facet: {
          metadata: [{ $count: "totalItems" }],
          data: [{ $skip: (page - 1) * pageSize }, { $limit: pageSize }],
        },
      },
    ]);

    return {
      items: items[0].data,
      totalItems: items[0].metadata[0]?.totalItems || 0,
    };
  }
}

const companiesService = new CompaniesService();

export default companiesService;
