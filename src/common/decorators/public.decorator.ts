import { SetMetadata } from '@nestjs/common';
import { PUBLIC_KEY } from '../contants/decorator.contant';

// Cài đặt sẽ không được thực hiện jwt kiểm tra
export const Public = () => SetMetadata(PUBLIC_KEY, true);
