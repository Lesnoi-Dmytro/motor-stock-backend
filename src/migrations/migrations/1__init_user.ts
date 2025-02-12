import { UserRole } from "models/users/User";
import { User } from "schemas/User";
import passwordEncodeService from "services/auth/passwordEncodeService";

export async function initUser() {
  await new User({
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    role: UserRole.EMPLOYEE,
    password: await passwordEncodeService.encode("password"),
  }).save({ validateBeforeSave: false });
}
