import { Injectable } from '@nestjs/common';
import { CreatePromotionDetailDto } from './dto/create-promotion_detail.dto';
import { UpdatePromotionDetailDto } from './dto/update-promotion_detail.dto';

@Injectable()
export class PromotionDetailService {
  create(createPromotionDetailDto: CreatePromotionDetailDto) {
    return 'This action adds a new promotionDetail';
  }

  findAll() {
    return `This action returns all promotionDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} promotionDetail`;
  }

  update(id: number, updatePromotionDetailDto: UpdatePromotionDetailDto) {
    return `This action updates a #${id} promotionDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} promotionDetail`;
  }
}
