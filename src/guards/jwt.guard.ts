import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from '../redis/service/redis/redis.service';
import { UserService } from '../users/services/user/user.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
    private readonly userService: UserService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = this.jwtService.verify(token);
      request.user = decoded;

      // Check in Redis if the user exists
      const redisKey = `wealth-user:${decoded.id}`;
      const userInRedis = await this.redisService.get(redisKey);

      if (userInRedis) {
        return true;
      }

      // If not in Redis, check in the database
      const userInDb = await this.userService.getUserById(decoded.id);

      if (userInDb) {
        // Set user in Redis
        await this.redisService.set(redisKey, userInDb, 60 * 60 * 24); // Cache for 1 day
        return true;
      } else {
        throw new UnauthorizedException('User not found');
      }
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}

@Injectable()
export class ProfileCompletionGuard extends JwtAuthGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isJwtValid = await super.canActivate(context);

    if (!isJwtValid) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user.isProfileCompleted) {
      throw new ForbiddenException('User profile is not completed');
    }

    return true;
  }
}