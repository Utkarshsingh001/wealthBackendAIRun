import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import { secrets } from 'src/config/secrets';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private redisClient: Redis;

  onModuleInit() {
    this.redisClient = new Redis({
      host: secrets.REDIS_HOST,
      port: secrets.REDIS_PORT,
      // password: 'your-password', // if needed
    });

    this.redisClient.on('connect', () => console.log('Redis connected ✅'));
    this.redisClient.on('error', (err) => console.error('Redis error ❌', err));
  }

  onModuleDestroy() {
    this.redisClient.quit();
  }

  async set<T>(key: string, value: T, ttlSeconds = 60): Promise<void> {
    const data = JSON.stringify(value);
    await this.redisClient.set(key, data, 'EX', ttlSeconds);
  }

  async get<T>(key: string): Promise<T | null> {
    const data = await this.redisClient.get(key);
    return data ? JSON.parse(data) : null;
  }
}
