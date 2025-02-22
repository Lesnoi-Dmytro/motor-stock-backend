import type { Paginated, PaginatedRequest } from "models/pagination";

export interface TypesFiltersRequest extends PaginatedRequest {
  name?: string;
  ids?: string;
}

export interface TypesFilters extends Paginated {
  name?: string;
  ids?: string[];
}
