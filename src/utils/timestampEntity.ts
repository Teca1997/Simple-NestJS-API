import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export class TimestampEntity extends BaseEntity {
  @CreateDateColumn({ type: 'timestamptz', select: false })
  dateCreated?: Date;

  @DeleteDateColumn({ type: 'timestamptz', select: false })
  dateDeleted?: Date;

  @UpdateDateColumn({ type: 'timestamptz', select: false })
  dateUpdated?: Date;
}
