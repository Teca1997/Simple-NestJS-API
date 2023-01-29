import { Column, Entity, Index, ManyToOne, PrimaryColumn } from 'typeorm';

import { TimestampEntity } from 'src/utils/timestampEntity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Token extends TimestampEntity {
  constructor(token: string, user: number) {
    super();
    this.token = token;
    this.user = user;
  }
  @PrimaryColumn({ type: 'text' })
  token!: string;

  @Index({})
  @Column({ type: 'number', name: 'userId' })
  @ManyToOne(() => User, (user) => user.tokens, { nullable: false })
  user!: number;
}
