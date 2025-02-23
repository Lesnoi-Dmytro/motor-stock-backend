import type { ICreateItemRequest } from "@/models/items/itemCreateRequest";

export interface ICreateCompanyItemRequest {
  item: ICreateItemRequest;
  company: string;
  price: number;
  quantity?: number;
}
