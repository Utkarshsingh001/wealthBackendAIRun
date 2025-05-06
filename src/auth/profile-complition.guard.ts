import { Injectable, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';

@Injectable()
export class ProfileCompletionGuard extends JwtAuthGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context); // Call the parent guard to handle JWT validation

    const request = context.switchToHttp().getRequest();

    // Check if the route is public
    if (request.isPublic || request.onlyAuth) {
      return true; // Allow access to public routes
    }

    const user = request.user;

    // If the profile is not completed, throw a ForbiddenException
    if (!user.isProfileCompleted) {
      throw new ForbiddenException('User profile is not completed');
    }

    return true;
  }
}
