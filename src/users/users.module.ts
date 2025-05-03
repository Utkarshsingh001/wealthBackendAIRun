import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { AuthController } from './controllers/auth/auth.controller';
import { UserService } from './services/user/user.service';
import { PrismaModule } from '../prisma/prisma.module';
import { Service } from './.service';
import { FirebaseService } from 'src/firebase/firebase.service';
import { RedisService } from 'src/redis/service/redis/redis.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from './services/jwt/jwt.service';
import { secrets } from 'src/config/secrets';
import { IpService } from 'src/services/ip/ip.service';
import { CurrencyService } from 'src/services/currency/currency.service';


@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: secrets.JWT_SECRET, // Replace with a secure key
    }),
  ],
  controllers: [UsersController, AuthController],
  providers: [UserService, Service, FirebaseService, RedisService, JwtService, IpService, CurrencyService],
})
export class UsersModule {}
