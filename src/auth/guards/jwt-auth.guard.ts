import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Permissions, PermissionUtil } from '@utils/permissions';
import { IS_PRIVATE_KEY } from '../auth.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPrivate = this.reflector.getAllAndOverride<Permissions>(
      IS_PRIVATE_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!isPrivate) return true;

    return isPrivate ? super.canActivate(context) : true;
  }

  handleRequest(
    err: any,
    user: Pick<User, 'id' | 'permissions' | 'name'>,
    info: any,
    context: ExecutionContext,
  ): any {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    const userPermission = new PermissionUtil(user.permissions);

    const permission = this.reflector.getAllAndOverride<Permissions>(
      IS_PRIVATE_KEY,
      [context.getHandler(), context.getClass()],
    );

    // If is admin or owner bypass every role
    if (
      userPermission.hasPermission(Permissions.Admin) ||
      userPermission.hasPermission(Permissions.Owner)
    )
      return user;

    if (userPermission.hasPermission(permission)) return user;

    throw new UnauthorizedException();
  }
}
