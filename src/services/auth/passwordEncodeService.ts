import bcrypt from "bcryptjs";

class PasswordEncodeService {
  private readonly saltRounds = 10;

  public async encode(password: string): Promise<string> {
    const salt = bcrypt.genSaltSync(this.saltRounds);
    return await bcrypt.hash(password, salt);
  }

  public async compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}

const passwordEncodeService = new PasswordEncodeService();

export default passwordEncodeService;
