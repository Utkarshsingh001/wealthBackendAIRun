import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { FirebaseService } from '../../../firebase/firebase.service';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly firebaseService: FirebaseService
  ) {}

  @Post('google')
  async createUser(@Body('idToken') idToken: string) {
    if (!idToken) {
        throw new BadRequestException('Missing Firebase ID token');
      }
    const decodedToken = await this.firebaseService.getAuth().verifyIdToken(idToken);
    const { uid, email, name, picture } = decodedToken;

    // const user = 

    // return { message: 'User created successfully', user };
  }
}
