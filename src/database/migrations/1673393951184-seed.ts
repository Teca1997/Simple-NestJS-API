import { MigrationInterface, QueryRunner } from 'typeorm';

import { Role } from '../..//roles/entities/role.entity';
import { RoleSeed } from '../seeds/role.seed';
import { User } from '../../users/entities/user.entity';
import { UserSeed } from '../seeds/user.seed';

export class seed1673393951184 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('run migration');
    RoleSeed.forEach((role) => {
      queryRunner.manager.save(new Role(role.name, role.description));
    });
    /* TokenSeed.forEach((token) => {
      queryRunner.manager.save(new Token(token.token, token.user));
    }); */
    UserSeed.forEach((user) => {
      queryRunner.manager.save(
        new User(
          user.username,
          user.email,
          user.password,
          user.role!,
          user.verifiedDate!,
        ),
      );
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
