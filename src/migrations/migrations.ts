import { initUser } from "migrations/migrations/1__init_user";
import { updateUser } from "migrations/migrations/2__update_user";

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
];
