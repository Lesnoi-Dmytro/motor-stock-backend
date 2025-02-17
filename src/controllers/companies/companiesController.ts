import type { Request, Response } from "express";
import companiesService from "services/companies/companiesService";

class CompaniesController {
  public async getAllCompanies(req: Request, res: Response) {
    const companies = companiesService.getAllCompanies();

    res.json(companies);
  }
}

const companiesController = new CompaniesController();

export default companiesController;
