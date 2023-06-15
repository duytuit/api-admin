import { Injectable } from '@nestjs/common';
import { CreateGenreDto } from './dto/req-genre.dto';
import { UpdateGenreDto } from './dto/res-genre.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from './entities/genre.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}
  async addOrUpdate(CreateGenreDto: CreateGenreDto) {
    return await this.genreRepository.save(CreateGenreDto);
  }
  async findByLink(name: string) {
    const where: FindOptionsWhere<Genre> = {};
    if (name) {
      where.linkExternal = Like(`%${name}%`);
    }
    return await this.genreRepository.findOneBy(where);
  }
  findAll() {
    return `This action returns all genres`;
  }

  findOne(id: number) {
    return `This action returns a #${id} genre`;
  }

  update(id: number, updateGenreDto: UpdateGenreDto) {
    return `This action updates a #${id} genre`;
  }

  remove(id: number) {
    return `This action removes a #${id} genre`;
  }
}
