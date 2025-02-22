import type { Paginated, PaginatedRequest } from "models/pagination";

export interface ICompaniesByItemFiltersRequest extends PaginatedRequest {
  name?: string;
}

export interface ICompaniesByItemFilters extends Paginated {
  name?: string;
}
