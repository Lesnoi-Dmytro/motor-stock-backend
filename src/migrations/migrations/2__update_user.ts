import { UserColors } from "models/users/user";
import { User } from "schemas/users/user";

export async function updateUser() {
  await User.findOneAndUpdate(
    {
      email: "johndoe@example.com",
    },
    {
      $set: {
        color: UserColors.DEEP_PURPLE,
      },
    }
  );
}
