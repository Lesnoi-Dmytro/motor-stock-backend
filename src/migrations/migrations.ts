import { initUser } from "migrations/migrations/1__init_user";
import { updateUser } from "migrations/migrations/2__update_user";
import { initCompanies } from "migrations/migrations/3__init_companies";
import { initCompanyUsers } from "migrations/migrations/4__init_company_users";
import { initTypes } from "migrations/migrations/5__init_item_types";
import { initItems } from "migrations/migrations/6__init_items";
import { initCompanyItems } from "migrations/migrations/7__init_company_items";

interface Migartion {
  id: number;
  migration: () => Promise<void>;
}

export const migrations: Migartion[] = [
  {
    id: 1,
    migration: initUser,
  },
  {
    id: 2,
    migration: updateUser,
  },
  {
    id: 3,
    migration: initCompanies,
  },
  {
    id: 4,
    migration: initCompanyUsers,
  },
  {
    id: 5,
    migration: initTypes,
  },
  {
    id: 6,
    migration: initItems,
  },
  {
    id: 7,
    migration: initCompanyItems,
  },
];
