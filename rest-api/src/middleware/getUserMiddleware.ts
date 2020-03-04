import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import { JWT_PASS } from "../constants";

@Injectable()
export class GetUserMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const jwttoken = req.headers.authorization;

    if (!jwttoken) {
      next();
      return;
    }

    try {
      const user = jwt.verify(jwttoken, JWT_PASS)
      if (user) {
        console.log("fonding details", user);
        req["user"] = user;
      }

    } catch (error) {
      throw new UnauthorizedException();
    }

    next();
  }

}
