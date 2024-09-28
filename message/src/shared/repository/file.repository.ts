import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { FileEntity } from '../entity/file.entity';

@Injectable()
export class FileRepository extends Repository<FileEntity> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(FileEntity, dataSource.createEntityManager());
  }
}
