import { Module } from '@nestjs/common';
import { RedisService } from './service/redis/redis.service';

@Module({
  providers: [RedisService]
})
export class RedisModule {}
