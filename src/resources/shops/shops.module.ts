import { Module } from '@nestjs/common';
import { ShopService } from './shops.service';
import { ShopController } from './shops.controller';

@Module({
  controllers: [ShopController],
  providers: [ShopService]
})
export class ShopsModule {}
