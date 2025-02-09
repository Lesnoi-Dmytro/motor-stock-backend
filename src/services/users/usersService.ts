import type { IUser } from "models/users/user";
import { User } from "schemas/user";

class UsersService {
  public async getUserByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email }).lean();
  }
}

const usersService = new UsersService();

export default usersService;
