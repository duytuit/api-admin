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
  async add(
    files?: Array<Express.Multer.File>,
    body?: any,
    folder?: string,
    gettime?: boolean,
  ): Promise<any[]> {
    const upload_arr = [];
    if (files.length > 0) {
      const fdata: any = new FormData();
      files.forEach((item) => {
        fdata.append('files', item.buffer, item.originalname);
      });
      const url = folder
        ? `${process.env.UPLOAD_CDN}common/uploads?folder=${folder}`
        : `${process.env.UPLOAD_CDN}common/uploads`;
      const result: any = await axios.post(url, fdata, {
        headers: {
          'Content-Type': `multipart/form-data; boundary=${fdata.getBoundary()}`,
        },
      });

      if ((result.code = 200)) {
        const data_upload = await Promise.all(
          result.data.data.map(async (item, index) => {
            const upload = new Upload();
            upload.fileName = item.filename;
            upload.externalLink = item.path;
            upload.fileOriginalName = item.originalname;
            upload.type = item.mimetype;
            upload.fileSize = item.size;
            upload.projectId = body?.projectId;
            upload.sort = 1;
            upload.extension = mime.extension(item.mimetype);
            return await this.uploadRepository.save(upload);
          }),
        );
        upload_arr.push(...data_upload);
      }
    }
    if (body.path_file) {
      const url = folder
        ? gettime
          ? `${process.env.UPLOAD_CDN}common/upload/path?fileUrl=${body.path_file}&folder=${folder}&gettime=${gettime}`
          : `${process.env.UPLOAD_CDN}common/upload/path?fileUrl=${body.path_file}&folder=${folder}`
        : gettime
        ? `${process.env.UPLOAD_CDN}common/upload/path?fileUrl=${body.path_file}&gettime=${gettime}`
        : `${process.env.UPLOAD_CDN}common/upload/path?fileUrl=${body.path_file}`;
      const result: any = await axios.get(url);

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
  /**
   * @param buffer đây là file buffer
   * @param file_name truyền tên file vào đây
   * @returns kết quả trả về là
   */
  async addByBuffer(buffer, file_name, folder?: string, gettime?: boolean) {
    const fdata: any = {
      buffer: buffer,
      file_name: file_name,
      gettime: gettime,
    };
    const url = folder
      ? `${process.env.UPLOAD_CDN}common/upload/buffer?folder=${folder}`
      : `${process.env.UPLOAD_CDN}common/upload/buffer`;
    console.log(url);
    const result: any = await axios.post(url, fdata, {
      headers: {
        'Content-Type': `application/json`,
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });
    if ((result.data.code = 200)) {
      const upload = new Upload();
      upload.fileName = result.data.data.filename;
      upload.externalLink = result.data.data.path;
      upload.fileOriginalName = result.data.data.filename;
      upload.sort = 1;
      upload.extension = result.data.data.ext;
      const data_upload = await this.uploadRepository.save(upload);
      return data_upload;
    }
  }
  /**
   * @returns trả về danh sách sản phẩm
   */
  findAll() {
    return `This action returns all upload`;
  }
  async findByName(name: string) {
    const where: FindOptionsWhere<Upload> = {};
    if (name) {
      where.fileName = Like(`%${name}%`);
    }
    return await this.uploadRepository.findOneBy(where);
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
