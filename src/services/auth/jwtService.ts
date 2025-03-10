import { settings } from "@/config/settings";
import jwt from "jsonwebtoken";
import type { ICompany } from "@/models/companies/company";
import { UserRole, type IUser } from "@/models/users/user";

class JwtService {
  private readonly jwtPrivateKey = settings.jwt_private_key;
  private readonly jwtPublicKey = settings.jwt_public_key;
  private readonly issuer = "Motor Stock";
  private readonly audience = "Motor Stock";

  public generateToken(user: IUser): string {
    const token = jwt.sign(
      {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        color: user.color,
        role: user.role,
        company: user.company ? (user.company as ICompany)?.name : undefined,
      },
      this.jwtPrivateKey,
      {
        algorithm: "RS256",
        expiresIn: "7d",
        subject: user._id.toString(),
        audience: this.audience,
        issuer: this.issuer,
      }
    );

    return token;
  }

  public decodeToken(token: string) {
    try {
      const decodedToken = jwt.verify(token, this.jwtPublicKey, {
        algorithms: ["RS256"],
        audience: this.audience,
        issuer: this.issuer,
      });

      if (
        typeof decodedToken === "string" ||
        !this.isClaimsValid(decodedToken)
      ) {
        throw new Error("Invalid token");
      }

      return decodedToken;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error("Token expired");
      } else {
        throw new Error("Invalid token");
      }
    }
  }

  private isClaimsValid(payload: jwt.JwtPayload) {
    return (
      payload.sub &&
      payload.email &&
      payload.firstName &&
      payload.lastName &&
      payload.color &&
      payload.role &&
      (payload.role !== UserRole.SUPPLIER || payload.company)
    );
  }
}

const jwtService = new JwtService();

export default jwtService;
