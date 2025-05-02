import { Controller, Get, Post, Body, BadRequestException, Request, UseGuards, Put, NotFoundException } from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { UserService } from '../../services/user/user.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userRepo: UserService,
  ) {}

  @Get()
  async getUsers() {
    const users = await this.userRepo.getAllUsers();
    return { message: 'Users fetched successfully', users };
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    const userId = req.user.id; // Extracted from validated JWT token

    const user = await this.userRepo.getUserById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return { message: 'Profile fetched successfully', data : user };
  }

  @Put('profile')
  @UseGuards(JwtAuthGuard)
  async updateProfile(@Request() req, @Body() updateData: Partial<CreateUserDto>) {
    const userId = req.user.id; // Extracted from validated JWT token

    if (!updateData || Object.keys(updateData).length === 0) {
      throw new BadRequestException('No data provided to update');
    }

    const updatedUser = await this.userRepo.updateUserProfile(userId, updateData);

    return { message: 'Profile updated successfully', data: updatedUser };
  }
}
