import { Injectable } from '@nestjs/common';

@Injectable()
export class TokensService {
  findAll() {
    return `This action returns all tokens`;
  }

  findOne(id: number) {
    return `This action returns a #${id} token`;
  }

  remove(id: number) {
    return `This action removes a #${id} token`;
  }
}
