import type { Paginated, PaginatedRequest } from "models/pagination";

export interface CompanyItemFiltersRequest extends PaginatedRequest {
  search?: string;
  companies?: string;
  companyName?: string;
  types?: string;
  items?: string;
  article?: string;
}

export interface CompanyItemFilters extends Paginated {
  search?: string;
  companies?: string[];
  companyName?: string;
  types?: string[];
  items?: string[];
  article?: string;
}
