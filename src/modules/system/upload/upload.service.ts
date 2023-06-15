import { Injectable } from '@nestjs/common';
import { ResUploadDto } from './dto/res-upload.dto';
import { Upload } from './entities/upload.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { ReqUploadDto } from './dto/req-upload.dto';
import axios from 'axios';
import * as FormData from 'form-data';
import * as fs from 'fs';
import * as mime from 'mime-types';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(Upload)
    private readonly uploadRepository: Repository<Upload>,
  ) {}
  async add(files?: Array<Express.Multer.File>, path_file?: string) {
    const upload_arr = [];
    if (files.length > 0) {
      const fdata: any = new FormData();
      files.forEach((item) => {
        fdata.append('files', item.buffer, item.originalname);
      });
      const result: any = await axios.post(
        'http://45.119.87.103:8090/common/uploads',
        fdata,
        {
          headers: {
            'Content-Type': `multipart/form-data; boundary=${fdata.getBoundary()}`,
          },
        },
      );

      if ((result.code = 200)) {
        const data_upload = await Promise.all(
          result.data.data.map(async (item, index) => {
            const upload = new Upload();
            upload.fileName = item.filename;
            upload.externalLink = item.path;
            upload.fileOriginalName = item.originalname;
            upload.type = item.mimetype;
            upload.fileSize = item.size;
            upload.sort = 1;
            upload.extension = mime.extension(item.mimetype);
            return await this.uploadRepository.save(upload);
          }),
        );
        upload_arr.push(...data_upload);
      }
    }
    if (path_file) {
      const result: any = await axios.get(
        `http://45.119.87.103:8090/common/upload/path?fileUrl=${path_file}`,
      );
      console.log(result.data.data.filename);

      if ((result.code = 200)) {
        const upload = new Upload();
        upload.fileName = result.data.data.filename;
        upload.externalLink = result.data.data.path;
        upload.fileOriginalName = result.data.data.filename;
        upload.sort = 1;
        upload.extension = result.data.data.ext;
        const data_upload = await this.uploadRepository.save(upload);
        upload_arr.push(data_upload);
      }
    }
    return upload_arr;
  }

  findAll() {
    return `This action returns all upload`;
  }
  async findByName(name: string) {
    const where: FindOptionsWhere<Upload> = {};
    if (name) {
      where.fileName = Like(`%${name}%`);
    }
    return await this.uploadRepository.findBy(where);
  }
  /* Truy vấn thông qua ID */
  async findOne(uploadId: number) {
    return this.uploadRepository.findOneBy({ uploadId });
  }

  /* Xoá */
  async remove(IdArr: number[] | string[]) {
    return this.uploadRepository.softDelete(IdArr);
  }
}
