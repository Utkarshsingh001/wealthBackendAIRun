import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthService {
  constructor(private readonly jwtService: NestJwtService) {}

  createToken(payload: { id: string; email: string; name: string }): string {
    return this.jwtService.sign(payload, {
      expiresIn: '1d', // 1 day expiration
    });
  }
}