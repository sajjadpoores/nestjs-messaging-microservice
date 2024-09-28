import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }
}
