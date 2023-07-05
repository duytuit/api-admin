import { Module } from '@nestjs/common';
import { PromotionDetailService } from './promotion_detail.service';
import { PromotionDetailController } from './promotion_detail.controller';

@Module({
  controllers: [PromotionDetailController],
  providers: [PromotionDetailService]
})
export class PromotionDetailModule {}
