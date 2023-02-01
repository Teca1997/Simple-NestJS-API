import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    await this.checkEmailAvilable(createUserDto.email);
    await this.checkUsernameAvilable(createUserDto.username);
    const { password, ...userWithoutPassword } = await this.userRepo.save(
      createUserDto,
    );
    return userWithoutPassword;
  }

  async findAll() {
    return await this.userRepo.find();
  }

  async findOneById(id: number) {
    const { password, ...userWithoutPassword } = (
      await this.userRepo.findBy({ id })
    )[0];
    if (userWithoutPassword === undefined) {
      throw new NotFoundException(`User with ID ${id} was not found`);
    }
    return userWithoutPassword;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.checkEmailAvilable(updateUserDto.email);
    await this.checkUsernameAvilable(updateUserDto.username);
    await this.findOneById(id);
    await this.userRepo.update(id, updateUserDto);
    return await this.findOneById(id);
  }

  async remove(id: number) {
    await this.findOneById(id);
    return await this.userRepo.delete(id);
  }

  async checkUsernameAvilable(username: string): Promise<void> {
    if ((await this.userRepo.findBy({ username }))[0] !== undefined) {
      throw new NotFoundException(
        `User with usernme ${username} already exists`,
      );
    }
    return;
  }

  async checkEmailAvilable(email: string): Promise<void> {
    if ((await this.userRepo.findBy({ email }))[0] !== undefined) {
      throw new NotFoundException(`User with email ${email} already exists`);
    }
    return;
  }
}
