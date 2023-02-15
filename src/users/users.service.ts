import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common/exceptions';
import { PasswordService } from 'src/auth/services/password.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => PasswordService))
    private passwordService: PasswordService,
  ) {}

  async create(data: Prisma.UserCreateInput): Promise<Omit<User, 'password'>> {
    const encryptedPassword = await this.passwordService.hashPassword(
      data.password,
    );
    const { password, ...user } = await this.prisma.user.create({
      data: { ...data, password: encryptedPassword },
    });
    return user;
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    const { password, ...user } = await this.prisma.user.findUnique({
      where: { id },
    });
    return user;
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { username } });
    if (!user) {
      throw new NotFoundException("The user doesn't exist");
    }

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
