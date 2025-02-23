import type { Paginated, PaginatedRequest } from "@/models/pagination";

export interface ISuppliesFilters extends Paginated {
  item?: string;
  sort?: string;
}

export interface ISuppliesRequestFilters extends PaginatedRequest {
  item?: string;
  sort?: string;
}
