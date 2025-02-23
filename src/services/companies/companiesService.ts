import type { ICompaniesByItemFilters } from "@/models/companies/companiesByItemFilters";
import type { ICompaniesFilters } from "@/models/companies/companiesFilters";
import type { ICompany } from "@/models/companies/company";
import type { ICompanyItem } from "@/models/items/companyItem/companyItem";
import mongoose from "mongoose";
import { Company } from "@/schemas/companies/Company";
import { CompanyItem } from "@/schemas/items/CompanyItem";
import { startsWith } from "@/utils/reqex/regexUtils";
import type { IUpdateCompanyRequest } from "@/models/companies/updateCompanyRequest";
import type { ICreateCompanyRequest } from "@/models/companies/createCompanyRequest";

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

  public async createCompany(company: ICreateCompanyRequest) {
    const oldCompany = await Company.findOne({
      name: company.name,
    });
    if (oldCompany) {
      throw new Error("Company already exists");
    }

    return await Company.create(company);
  }

  public async updateCompany(id: string, company: IUpdateCompanyRequest) {
    const newcompany = await Company.findByIdAndUpdate(id, company, {
      new: true,
    });
    if (!newcompany) {
      throw new Error("Company not found");
    }

    return newcompany;
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
          localField: "_id",
          foreignField: "_id",
          as: "company",
        },
      },
      {
        $unwind: "$company",
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
      items: items[0].data.map(
        (item: { company: ICompany; _id: mongoose.Types.ObjectId }) =>
          item.company
      ),
      totalItems: items[0].metadata[0]?.totalItems || 0,
    };
  }
}

const companiesService = new CompaniesService();

export default companiesService;
