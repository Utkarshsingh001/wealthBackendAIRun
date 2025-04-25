import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service.js';
@Controller('users')
export class UsersController {
  constructor(private prisma: PrismaService) {}
  @Get()
  async getUsers() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
    console.log(users);
    return { message: 'Users fetched successfully', users };
  }
}
