import jwtService from "@/services/auth/jwtService";
import passwordEncodeService from "@/services/auth/passwordEncodeService";
import usersService from "@/services/users/usersService";

class AuthService {
  public async login(email: string, password: string): Promise<string> {
    const user = await usersService.getUserByEmail(email, true);
    if (
      !user ||
      !(await passwordEncodeService.compare(password, user.password))
    ) {
      throw new Error("Invalid credentials");
    }

    const token = jwtService.generateToken(user);

    return token;
  }
}

const authService = new AuthService();

export default authService;
