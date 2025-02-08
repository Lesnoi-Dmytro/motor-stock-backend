import { UserRole, type IUser } from "models/User";
import { User } from "schemas/User";

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
    await User.create(user);
    console.log(`User ${user.email} created`);
  } else {
    console.log(`User ${user.email} already exists`);
  }
});
