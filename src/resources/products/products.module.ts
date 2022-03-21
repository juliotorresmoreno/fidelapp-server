import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ShopService } from '../shops/shops.service';

@Module({
    controllers: [ProductsController],
    providers: [ProductsService, ShopService]
})
export class ProductsModule { }
