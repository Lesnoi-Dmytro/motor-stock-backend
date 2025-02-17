import type { IUser } from "models/users/User";
import { User } from "schemas/users/user";

class UsersService {
  public async getUserByEmail(
    email: string,
    includeCompany = false
  ): Promise<IUser | null> {
    let user = User.findOne({ email });

    if (includeCompany) {
      user = user.populate({
        path: "company",
      });
    }

    return await user.lean().exec();
  }
}

const usersService = new UsersService();

export default usersService;
