import { Module } from '@nestjs/common';
import { JwtAuthService } from './jwt.service';

@Module({
    providers : [JwtAuthService]
})
export class AuthModule {}
