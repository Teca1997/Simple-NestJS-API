import * as bcrypt from 'bcrypt';

import { MigrationInterface, QueryRunner } from 'typeorm';

import { Role } from '../../roles/entities/role.entity';
import { RoleSeed } from '../seeds/role.seed';
import { User } from '../../users/entities/user.entity';
import { UserSeed } from '../seeds/user.seed';

export class seed1673393951184 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    RoleSeed.forEach(async (role) => {
      await queryRunner.manager.save(new Role(role.name, role.description));
    });
    /* TokenSeed.forEach((token) => {
      queryRunner.manager.save(new Token(token.token, token.user));
    }); */
    UserSeed.forEach(async (user) => {
      const hashedPassword = bcrypt.hashSync(user.password, 10);
      await queryRunner.manager.save(
        new User(user.username, user.email, hashedPassword, user.role!, user.verifiedDate!),
      );
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
