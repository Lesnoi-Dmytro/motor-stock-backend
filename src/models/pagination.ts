export interface PaginatedRequest {
  page?: string;
  pageSize?: string;
}

export interface Paginated {
  page: number;
  pageSize: number;
}

export interface PaginationResponse<T> {
  items: T[];
  totalItems: number;
}
