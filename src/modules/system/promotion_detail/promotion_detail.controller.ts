import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PromotionDetailService } from './promotion_detail.service';
import { CreatePromotionDetailDto } from './dto/create-promotion_detail.dto';
import { UpdatePromotionDetailDto } from './dto/update-promotion_detail.dto';

@Controller('promotion-detail')
export class PromotionDetailController {
  constructor(private readonly promotionDetailService: PromotionDetailService) {}

  @Post()
  create(@Body() createPromotionDetailDto: CreatePromotionDetailDto) {
    return this.promotionDetailService.create(createPromotionDetailDto);
  }

  @Get()
  findAll() {
    return this.promotionDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.promotionDetailService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePromotionDetailDto: UpdatePromotionDetailDto) {
    return this.promotionDetailService.update(+id, updatePromotionDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.promotionDetailService.remove(+id);
  }
}
