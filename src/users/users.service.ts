import { Injectable, NotFoundException } from '@nestjs/common';
import { ConflictException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(createUserDTO: CreateUserDTO) {
    await this.checkEmailAvilable(createUserDTO.email);
    await this.checkUsernameAvilable(createUserDTO.username);

    createUserDTO.password = await bcrypt.hash(createUserDTO.password, 10);

    const { password, refreshToken, ...userWithoutPassword } = await this.userRepo.save(createUserDTO);
    return userWithoutPassword;
  }

  async findAll() {
    return await this.userRepo.find();
  }

  async findOneById(id: number) {
    const user = (await this.userRepo.findBy({ id }))[0];
    return user;
  }

  async findOneByUsername(username: string) {
    const user = (await this.userRepo.findBy({ username }))[0];
    return user;
  }

  async update(id: number, updateUserDTO: UpdateUserDTO) {
    const user = await this.findOneById(id);

    if (user === undefined) {
      throw new NotFoundException(`User with ID ${id} was not found`);
    }
    if (updateUserDTO.email !== undefined) {
      await this.checkEmailAvilable(updateUserDTO.email);
      user.email = updateUserDTO.email;
    }
    if (updateUserDTO.username !== undefined) {
      await this.checkUsernameAvilable(updateUserDTO.username);
      user.username = updateUserDTO.username;
    }
    if (updateUserDTO.password !== undefined) {
      user.password = await bcrypt.hash(updateUserDTO.password, 10);
    }
    if (updateUserDTO.role !== undefined) {
      user.role = updateUserDTO.role;
    }
    if (updateUserDTO.refreshToken !== undefined) {
      user.refreshToken = updateUserDTO.refreshToken!;
    }
    const { password, refreshToken, ...userWithoutPassword } = await this.userRepo.save({ ...user }, { reload: true });
    return userWithoutPassword;
  }

  async remove(id: number) {
    const user = await this.findOneById(id);
    if (user === undefined) {
      throw new NotFoundException(`User with ID ${id} was not found`);
    }
    return await this.userRepo.delete(id);
  }

  async checkUsernameAvilable(username: string): Promise<void> {
    if ((await this.userRepo.findBy({ username }))[0] !== undefined) {
      throw new ConflictException(`User with usernme ${username} already exists`);
    }
    return;
  }

  async checkEmailAvilable(email: string): Promise<void> {
    if ((await this.userRepo.findBy({ email }))[0] !== undefined) {
      throw new ConflictException(`User with email ${email} already exists`);
    }
    return;
  }
}
