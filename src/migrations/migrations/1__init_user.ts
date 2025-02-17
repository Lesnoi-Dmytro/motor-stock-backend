import { User } from "schemas/users/user";
import passwordEncodeService from "services/auth/passwordEncodeService";

export async function initUser() {
  await new User({
    ...initialUser,
    password: await passwordEncodeService.encode(initialUser.password),
  }).save({ validateBeforeSave: false });
}

export const initialUser = {
  firstName: "John",
  lastName: "Doe",
  email: "johndoe@example.com",
  role: "EMPLOYEE",
  password: "password",
};
