export interface PaginatedRequest {
  page?: number;
  pageSize?: number;
}

export interface PaginationResponse<T> {
  items: T[];
  totalPages: number;
}
