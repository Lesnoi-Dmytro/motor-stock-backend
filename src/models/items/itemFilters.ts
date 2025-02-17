import type { Paginated, PaginatedRequest } from "models/pagination";

export interface ItemFiltersRequest extends PaginatedRequest {
  search?: string;
  companies?: string;
  types?: string;
}

export interface ItemFilters extends Paginated {
  search?: string;
  companies?: string[];
  types?: string[];
}
