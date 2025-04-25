import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module.js';
import { PrismaModule } from './prisma/prisma.module';
import { FirebaseService } from './firebase/firebase.service';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [UsersModule, PrismaModule, RedisModule],
  controllers: [],
  providers: [FirebaseService],
})
export class AppModule {}
