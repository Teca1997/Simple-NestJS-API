import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { TimestampEntity } from 'src/utils/timestampEntity';
import { User } from 'src/users/entities/user.entity';

@Entity({ schema: process.env.DB_SCHEMA || 'public' })
export class Role extends TimestampEntity {
  constructor(name: string, description: string) {
    super();
    this.name = name;
    this.description = description;
  }

  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column({ length: 25 })
  name!: string;

  @Column({ type: 'text' })
  description!: string;

  @OneToMany(() => User, (user) => user.role)
  users?: User[] | null;
}
