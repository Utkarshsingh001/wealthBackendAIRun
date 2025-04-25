import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { AuthController } from './controllers/auth/auth.controller';
import { UserService } from './services/user/user.service';
import { PrismaModule } from '../prisma/prisma.module';
import { Service } from './.service';
import { FirebaseService } from 'src/firebase/firebase.service';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController, AuthController],
  providers: [UserService, Service, FirebaseService],
})
export class UsersModule {}
