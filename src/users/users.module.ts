import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { AuthController } from './controllers/auth/auth.controller';
import { UserService } from './services/user/user.service';
import { PrismaModule } from '../prisma/prisma.module';
import { Service } from './.service';
import { FirebaseService } from '../firebase/firebase.service';
import { RedisService } from '../redis/service/redis/redis.service';
import { IpService } from '../services/ip/ip.service';
import { CurrencyService } from '../services/currency/currency.service';
import { AuthModule } from '../auth/auth.module';


@Module({
  imports: [
    PrismaModule,
    AuthModule,
  ],
  controllers: [UsersController, AuthController],
  providers: [UserService, Service, FirebaseService, RedisService, IpService, CurrencyService],
  exports: [UserService]
})
export class UsersModule {}
