import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { FirebaseService } from '../../../firebase/firebase.service';
import { UserService } from 'src/users/services/user/user.service';
import { RedisService } from 'src/redis/service/redis/redis.service';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userRepo: UserService,
    private readonly firebase: FirebaseService,
    private readonly redis: RedisService,
  ) {}
  @Post('google')
  async googleLogin(@Body('idToken') idToken: string) {
    if (!idToken) {
      throw new BadRequestException('Missing Firebase ID token');
    }

    const decodedToken = await this.firebase.getAuth().verifyIdToken(idToken);
    console.log('Decoded token:', decodedToken);
    const { uid, email, name, picture } = decodedToken;

    if (!email) {
      throw new BadRequestException('No email found in token');
    }

    let user = await this.userRepo.findUserByFirebaseUid(uid);
    console.log('User found:', user);

    if (!user) {
      console.log('User not found, creating new user');
      const createUserDto: CreateUserDto = {
        uid,
        email,
        name,
        picture,
      };
      user = await this.userRepo.createUser(createUserDto);
    }
    await this.redis.set(`wealth-user:${user.id}`, user, 60 * 60 * 24); // Cache for 1 day

    return {
      message: 'Login successful',
      user,
    };
  }
}
