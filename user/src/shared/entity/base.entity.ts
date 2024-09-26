import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(0)',
  })
  createdAt?: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(0)',
  })
  updatedAt?: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    select: false,
    default: null,
  })
  deletedAt?: Date;

  @Column('bool', {
    default: false,
  })
  active: boolean;
}
