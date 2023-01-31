import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import type { Moment } from 'moment';
import { Role } from 'src/roles/entities/role.entity';
import { TimestampEntity } from 'src/utils/timestampEntity';
import { Token } from 'src/tokens/entities/token.entity';

@Entity({ schema: process.env.DB_DATABASE || 'public' })
export class User extends TimestampEntity {
  constructor(
    username: string,
    email: string,
    password: string,
    role: number | Role,
    verifierDate: Moment,
  ) {
    super();
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
    this.verifiedDate = verifierDate;
  }
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column({ length: 25, unique: true })
  username!: string;

  @Column({ length: 50, unique: true })
  email!: string;

  @Column({ type: 'char', length: 60 })
  password!: string;

  @Column({ type: 'timestamptz', nullable: true })
  verifiedDate?: Moment;

  @Column({ type: 'number', name: 'roleId', default: 1 })
  @ManyToOne(() => Role, (role) => role.users, { nullable: false, eager: true })
  role?: Role | number;

  @OneToMany(() => Token, (token) => token.user, { nullable: false })
  tokens?: Token[];
}
