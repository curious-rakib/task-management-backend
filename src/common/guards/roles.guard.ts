import { Injectable, ExecutionContext } from '@nestjs/common';

@Injectable()
export class RolesGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user } = context.switchToHttp().getRequest();
    if (user.isAdmin) {
      return true;
    }

    return false;
  }
}
