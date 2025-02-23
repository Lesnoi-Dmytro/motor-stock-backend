import type { NextFunction, Request, Response } from "express";
import type { ICompaniesByItemFiltersRequest } from "@/models/companies/companiesByItemFilters";
import type { ICompaniesFiltersRequest } from "@/models/companies/companiesFilters";
import companiesService from "@/services/companies/companiesService";
import { stringToArray } from "@/utils/arrays/stringToArray";
import createHttpError from "http-errors";
import type { ICreateCompanyRequest } from "@/models/companies/createCompanyRequest";
import type { IUpdateCompanyRequest } from "@/models/companies/updateCompanyRequest";

class CompaniesController {
  public async getAllCompanies(req: Request, res: Response) {
    const {
      page = "1",
      pageSize = "10",
      name,
      ids,
      exclude,
    } = req.query as ICompaniesFiltersRequest;

    if (ids) {
      const companies = await companiesService.getCompaniesByIds(
        stringToArray(ids)
      );

      res.json({ items: companies, totalItems: companies.length });
    } else {
      const companiesPage = await companiesService.getAllCompanies({
        page: Number(page),
        pageSize: Number(pageSize),
        name,
        exclude: exclude ? stringToArray(exclude) : undefined,
      });

      res.json(companiesPage);
    }
  }

  public async getCompaniesByItem(req: Request, res: Response) {
    const { id } = req.params;
    const {
      page = "1",
      pageSize = "10",
      name,
    } = req.query as ICompaniesByItemFiltersRequest;

    const companiesPage = await companiesService.getCompaniesByItem(id, {
      page: Number(page),
      pageSize: Number(pageSize),
      name,
    });

    res.json(companiesPage);
  }

  public async createCompany(req: Request, res: Response, next: NextFunction) {
    try {
      const companyData = req.body as ICreateCompanyRequest;
      const company = await companiesService.createCompany(companyData);
      res.json(company);
    } catch (error) {
      console.error(error);
      next(createHttpError(400, (error as Error).message));
    }
  }

  public async updateCompany(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const companyData = req.body as IUpdateCompanyRequest;
      const company = await companiesService.updateCompany(id, companyData);
      res.json(company);
    } catch (error) {
      console.error(error);
      next(createHttpError(400, (error as Error).message));
    }
  }
}

const companiesController = new CompaniesController();

export default companiesController;
