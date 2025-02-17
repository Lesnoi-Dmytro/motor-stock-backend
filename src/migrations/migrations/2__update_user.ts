import { initialUser } from "migrations/migrations/1__init_user";
import { UserColors } from "models/users/user";
import { User } from "schemas/users/user";

export async function updateUser() {
  await User.findOneAndUpdate(
    {
      email: initialUser.email,
    },
    {
      $set: {
        color: UserColors.DEEP_PURPLE,
      },
    }
  );
}
