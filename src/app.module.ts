import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module.js';
import { PrismaModule } from './prisma/prisma.module';
import { FirebaseService } from './firebase/firebase.service';

@Module({
  imports: [UsersModule, PrismaModule],
  controllers: [],
  providers: [FirebaseService],
})
export class AppModule {}
