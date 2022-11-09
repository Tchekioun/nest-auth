import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma:PrismaService){}

  async create(data: Prisma.UserCreateInput) {
    const {password, ...rest} = await this.prisma.user.create({data});
    return rest;
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {

    return this.prisma.user.findUnique({where:{id}});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
