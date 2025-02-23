import type { Paginated, PaginatedRequest } from "@/models/pagination";

export interface ItemFiltersRequest extends PaginatedRequest {
  article?: string;
}

export interface ItemFilters extends Paginated {
  article?: string;
}
