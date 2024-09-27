import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { BaseCustomEntity } from './base.entity';
import { MessageEntity } from './message.entity';

@Entity('file')
export class FileEntity extends BaseCustomEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  url: string;

  @ManyToMany(() => MessageEntity, (message) => message.files)
  messages: MessageEntity[];
}
