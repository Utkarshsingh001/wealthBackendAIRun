import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthService } from './jwt.service';
import { secrets } from '../config/secrets';
import { RedisService } from 'src/redis/service/redis/redis.service';
import { UserService } from 'src/users/services/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    imports: [
        JwtModule.register({
            secret: secrets.JWT_SECRET,
            signOptions: { expiresIn: '1d' }, // Token expiration time
        }),
    ],
    providers: [JwtAuthService, RedisService, UserService, PrismaService],
    exports: [JwtAuthService, JwtModule], // Export JwtModule
})
export class AuthModule {}
