import type { Paginated, PaginatedRequest } from "@/models/pagination";

export interface ICompaniesFiltersRequest extends PaginatedRequest {
  name?: string;
  ids?: string;
  exclude?: string;
}

export interface ICompaniesFilters extends Paginated {
  name?: string;
  exclude?: string[];
}
