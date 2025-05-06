import { Controller, Get, Post, Body, BadRequestException, Request, UseGuards, Put, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { UserService } from '../../services/user/user.service';
import { OnlyAuth } from 'src/auth/decorators/only-auth.decorator';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userRepo: UserService,
  ) { }

  @Get()
  async getUsers() {
    const users = await this.userRepo.getAllUsers();
    return { message: 'Users fetched successfully', users };
  }

  @Get('profile')
  @OnlyAuth()
  async getProfile(@Request() req) {
    const userId = req.user.id; // Extracted from validated JWT token

    const user = await this.userRepo.getUserById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return { message: 'Profile fetched successfully', data: user };
  }

  @Put('profile')
  @OnlyAuth()
  async updateProfile(@Request() req, @Body() updateData: Partial<CreateUserDto>) {
    const userId = req.user.id; // Extracted from validated JWT token

    if (!updateData || Object.keys(updateData).length === 0) {
      throw new BadRequestException('No data provided to update');
    }
    if (updateData.email && updateData.name && updateData.phone && updateData.isEmailVerified && updateData.isPhoneVerified) {
      updateData.isProfileCompleted = true;
    }
    else {
      updateData.isProfileCompleted = false;
    }
    console.log('updateData', updateData);
    const updatedUser = await this.userRepo.updateUserProfile(userId, updateData);

    return { message: 'Profile updated successfully', data: updatedUser };
  }
}
