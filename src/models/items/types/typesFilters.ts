import type { Paginated, PaginatedRequest } from "@/models/pagination";

export interface TypesFiltersRequest extends PaginatedRequest {
  name?: string;
  exclude?: string;
  ids?: string;
}

export interface TypesFilters extends Paginated {
  name?: string;
  exclude?: string[];
  ids?: string[];
}
