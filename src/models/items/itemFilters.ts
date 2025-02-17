import type { PaginatedRequest } from "models/pagination";

export interface ItemFilters extends PaginatedRequest {
  search?: string;
  companies?: string[];
  types?: string[];
}
