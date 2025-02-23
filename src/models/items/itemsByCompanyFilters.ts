import type { Paginated, PaginatedRequest } from "models/pagination";

export interface ItemsByCompanyFiltersRequest extends PaginatedRequest {
  article?: string;
}

export interface ItemsByCompanyFilters extends Paginated {
  article?: string;
}
