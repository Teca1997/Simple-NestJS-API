import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepo: Repository<Role>,
  ) {}

  async findAll() {
    return await this.roleRepo.find();
  }

  async findOne(id: number) {
    const result = (await this.roleRepo.findBy({ id }))[0];
    if (result === undefined) {
      throw new NotFoundException(`Role with ID${id} was not found`);
    }
    return result;
  }
}
