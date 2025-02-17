import { User } from "schemas/users/user";
import passwordEncodeService from "services/auth/passwordEncodeService";

export async function initUser() {
  await new User({
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    role: "EMPLOYEE",
    password: await passwordEncodeService.encode("password"),
  }).save({ validateBeforeSave: false });
}
