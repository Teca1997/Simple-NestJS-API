import { Injectable, NotFoundException } from '@nestjs/common';
import { ConflictException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
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
    const { password, ...userWithoutPassword } = await this.userRepo.save(
      createUserDTO,
    );
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
    await this.checkEmailAvilable(updateUserDTO.email);
    await this.checkUsernameAvilable(updateUserDTO.username);
    await this.userRepo.update(id, updateUserDTO);
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
      throw new ConflictException(
        `User with usernme ${username} already exists`,
      );
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
