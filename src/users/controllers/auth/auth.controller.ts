import { BadRequestException, Body, Controller, Ip, Post } from '@nestjs/common';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { FirebaseService } from '../../../firebase/firebase.service';
import { UserService } from 'src/users/services/user/user.service';
import { RedisService } from 'src/redis/service/redis/redis.service';
import { JwtService } from '../../services/jwt/jwt.service';
import { IpService } from 'src/services/ip/ip.service'; // Assuming you have a service to determine country from IP
import { CurrencyService } from 'src/services/currency/currency.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userRepo: UserService,
    private readonly firebase: FirebaseService,
    private readonly redis: RedisService,
    private readonly jwtService: JwtService,
    private readonly ipService: IpService, // Injecting IP service
    private readonly currencyService: CurrencyService, // Injecting CurrencyService
  ) {}

  @Post('google')
  async googleLogin(@Body('idToken') idToken: string,@Ip() ip: string) {
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
        isEmailVerified: true,
      };
      user = await this.userRepo.createUser(createUserDto);

      // Assign default currency based on IP
      const country = await this.ipService.getCountryFromIp(ip);
      const currencyCode = this.getCurrencyByCountry(country);
      await this.currencyService.saveUserCurrency(user.id, currencyCode);
    }

    await this.redis.set(`wealth-user:${user.id}`, user, 60 * 60 * 24); // Cache for 1 day

    const jwtToken = this.jwtService.createToken({
      id: user.id,
      email: user.email,
      name: user.name,
    });

    return {
      message: 'Login successful',
      user,
      token: jwtToken,
    };
  }

  @Post('phone')
  async phoneLogin(
    @Body('idToken') idToken: string,
    @Ip() ip: string,
  ) {
    if (!idToken) {
      throw new BadRequestException('Missing Firebase ID token');
    }

    const decodedToken = await this.firebase.getAuth().verifyIdToken(idToken);
    console.log('Decoded token:', decodedToken);
    const { uid, phone_number } = decodedToken;

    if (!phone_number) {
      throw new BadRequestException('No phone number found in token');
    }

    let user = await this.userRepo.findUserByFirebaseUid(uid);
    console.log('User found:', user);

    if (!user) {
      console.log('User not found, creating new user');
      const createUserDto: CreateUserDto = {
        uid,
        phone: phone_number,
        isPhoneVerified: true,
        email: '',
        name: '',
      };
      user = await this.userRepo.createUser(createUserDto);

      // Assign default currency based on IP
      const country = await this.ipService.getCountryFromIp(ip);
      const currencyCode = this.getCurrencyByCountry(country);
      await this.currencyService.saveUserCurrency(user.id, currencyCode);
    }

    await this.redis.set(`wealth-user:${user.id}`, user, 60 * 60 * 24); // Cache for 1 day

    const jwtToken = this.jwtService.createToken({
      id: user.id,
      email: user.email,
      name: user.name,
    });

    return {
      message: 'Login successful',
      data : user,
      token: jwtToken,
    };
  }

  private getCurrencyByCountry(country: string): string {
    if (country === 'India') {
      return 'INR';
    } else if (['France', 'Germany', 'Italy', 'Spain'].includes(country)) { // Add more European countries as needed
      return 'EUR';
    } else {
      return 'USD';
    }
  }
}
