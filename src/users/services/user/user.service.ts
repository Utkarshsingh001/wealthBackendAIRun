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
}
