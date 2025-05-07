import { Injectable, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RedisService } from 'src/redis/service/redis/redis.service';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/services/user/user.service';

@Injectable()
export class ProfileCompletionGuard extends JwtAuthGuard {
  constructor(
    jwtService: JwtService,
    reflactor: Reflector,
    private readonly redisService: RedisService,
    private readonly userService: UserService
  ) {
    super(jwtService, reflactor);
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isJwtValid = await super.canActivate(context); // Call the parent guard to handle JWT validation
    if (!isJwtValid) {
      return false;
    }
    const request = context.switchToHttp().getRequest();

    // Check if the route is public
    if (request.isPublic || request.onlyAuth) {
      return true; // Allow access to public routes
    }
    const user = request.user;
    // Check if the user is authenticated
    const redisKey = `wealth-user:${user.id}`;
      const userInRedis: { id: string; isProfileCompleted?: boolean } | null = await this.redisService.get(redisKey);
      let userData: { id: string; isProfileCompleted: boolean };
      if (!userInRedis) {
        // If not in Redis, check in the database
        const userInDb = await this.userService.getUserById(user.id);
        if (userInDb) {
          userData = {
            id : userInDb.id,
            isProfileCompleted: userInDb.isProfileCompleted || false,
          };
          // Set user in Redis
          await this.redisService.set(redisKey, userInDb, 60 * 60 * 24); // Cache for 1 day
          if(request.onlyAuth) {
            return true;
          }
        } else {
          throw new ForbiddenException('User not found');
        }
      }
      else {
        userData = {
          id: userInRedis.id,
          isProfileCompleted: userInRedis.isProfileCompleted || false,
        };
        if(request.onlyAuth) {
          return true;
        }
      }

    // If the profile is not completed, throw a ForbiddenException
    if (!userData.isProfileCompleted) {
      throw new ForbiddenException('User profile is not completed');
    }

    return true;
  }
}
