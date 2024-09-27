import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseCustomEntity } from './base.entity';
import { FileEntity } from './file.entity';

@Entity('message')
export class MessageEntity extends BaseCustomEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false })
  sender: number;

  @Column({ type: 'int', nullable: false })
  reciever: number;

  @Column({ type: 'varchar', nullable: true })
  text: string;

  @ManyToMany(() => FileEntity, (file) => file.messages)
  @JoinTable({
    name: 'message_file',
    joinColumn: { name: 'messageId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'fileId', referencedColumnName: 'id' },
  })
  files: FileEntity[];

  @Column({ type: 'varchar', nullable: false })
  iv: string;
}
