import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../enum/role.enum';
import { BaseCustomEntity } from './base.entity';

@Entity('user')
export class UserEntity extends BaseCustomEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false, default: 'user' })
  name: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;
}
