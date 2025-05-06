import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthService } from './jwt.service';
import { secrets } from '../config/secrets';

@Module({
    imports: [
        JwtModule.register({
            secret: secrets.JWT_SECRET,
            signOptions: { expiresIn: '1d' }, // Token expiration time
        }),
    ],
    providers: [JwtAuthService],
    exports: [JwtAuthService, JwtModule], // Export JwtModule
})
export class AuthModule {}
