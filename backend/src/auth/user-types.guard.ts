import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export class UserTypes implements CanActivate {
  private typePassed: Array<string>;

  constructor(role: Array<string>) {
    this.typePassed = role;
  }
  canActivate(context: ExecutionContext): boolean {
    const request: any = context.switchToHttp().getRequest<Request>();
    if (this.typePassed.includes(request.user.type)) {
      return request.user;
    } else {
      throw new UnauthorizedException();
    }
  }
}
