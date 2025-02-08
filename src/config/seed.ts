import { UserRole, type IUser } from "models/users/user";
import { User } from "schemas/user";
import passwordEncodeService from "services/auth/passwordEncodeService";

const users: IUser[] = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    password: "password",
    role: UserRole.EMPLOYEE,
  },
];

users.forEach(async (user) => {
  const existingUser = await User.findOne({ email: user.email });
  if (!existingUser) {
    await User.create({
      ...user,
      password: await passwordEncodeService.encode(user.password),
    });
    console.log(`User ${user.email} created`);
  } else {
    console.log(`User ${user.email} already exists`);
  }
});
