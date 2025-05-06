import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module.js';
import { PrismaModule } from './prisma/prisma.module';
import { FirebaseService } from './firebase/firebase.service.js';
import { RedisModule } from './redis/redis.module';
import { AssetModule } from './asset/asset.module';
import { MediaModule } from './media/media.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard.js';
import { ProfileCompletionGuard } from './auth/profile-complition.guard.js';

@Module({
  imports: [UsersModule, PrismaModule, RedisModule, AssetModule, MediaModule, AuthModule],
  controllers: [],
  providers: [FirebaseService,
    {
      provide: APP_GUARD,
      useClass: ProfileCompletionGuard
    }
  ],
})
export class AppModule {}
