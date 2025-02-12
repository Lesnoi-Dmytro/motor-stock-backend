import type { IUser } from "models/users/User";
import { User } from "schemas/User";

class UsersService {
  public async getUserByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email }).lean();
  }
}

const usersService = new UsersService();

export default usersService;
