import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module.js';
import { PrismaModule } from './prisma/prisma.module';
import { FirebaseService } from './firebase/firebase.service';
import { RedisModule } from './redis/redis.module';
import { AssetModule } from './asset/asset.module';

@Module({
  imports: [UsersModule, PrismaModule, RedisModule, AssetModule],
  controllers: [],
  providers: [FirebaseService],
})
export class AppModule {}
