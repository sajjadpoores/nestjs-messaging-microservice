import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('config')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  key: string;

  @Column('text')
  value: string;
}
