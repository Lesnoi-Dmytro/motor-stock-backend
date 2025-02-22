import type { Request, Response } from "express";
import type { ICompaniesByItemFiltersRequest } from "models/companies/companiesByItemFilters";
import type { ICompaniesFiltersRequest } from "models/companies/companiesFilters";
import companiesService from "services/companies/companiesService";
import { stringToArray } from "utils/arrays/stringToArray";

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
}

const companiesController = new CompaniesController();

export default companiesController;
