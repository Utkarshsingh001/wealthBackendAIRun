import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) { }

    async findUserByFirebaseUid(uid: string) {
        return this.prisma.user.findUnique({
            where: { uid: uid },
        });
    }

    async createUser(data: CreateUserDto) {
        return this.prisma.user.create({
            data,
        });
    }

    async updateUserProfile(userId: string, updateData: Partial<CreateUserDto>) {
        return this.prisma.user.update({
            where: { id: userId },
            data: updateData,
        });
    }

    async getUserById(userId: string) {
        return this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                picture: true,
                isProfileCompleted: true,
                currency : {
                    select: {
                        currency : {
                            select: {
                                id: true,
                                name: true,
                                symbol: true,
                            }
                        }
                    },
                }
            }
        });
    }

    async getAllUsers() {
        return this.prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
            },
        });
    }
}
