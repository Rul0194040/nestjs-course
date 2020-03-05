import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { request } from "http";

@Injectable()
export class AuthGuard implements CanActivate{
  canActivate(context: ExecutionContext): boolean {
    const host = context.switchToHttp(),
    request = host.getRequest();

    const user = request["user"];

    if (!user) {
      throw new UnauthorizedException();
    }

    return true;
  }


}
