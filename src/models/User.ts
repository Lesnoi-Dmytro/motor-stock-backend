export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
  company?: string;
}

export enum UserRole {
  EMPLOYEE = "EMPLOYEE",
  SUPPLIER = "SUPPLIER",
}
