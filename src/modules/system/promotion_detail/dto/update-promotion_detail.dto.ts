import { PartialType } from '@nestjs/swagger';
import { CreatePromotionDetailDto } from './create-promotion_detail.dto';

export class UpdatePromotionDetailDto extends PartialType(CreatePromotionDetailDto) {}
