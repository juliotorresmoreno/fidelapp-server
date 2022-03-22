
import { Module } from '@nestjs/common';
import { UserShopsAccountsService } from './user_shops_accounts.service';
import { UserShopsAccountsController } from './user_shops_accounts.controller';
import { ShopService } from '../shops/shops.service';
import { HistoryService } from '../history/history.service';
import { ProductsService } from '../products/products.service';

@Module({
    controllers: [UserShopsAccountsController],
    providers: [UserShopsAccountsService, ShopService, HistoryService, ProductsService]
})
export class UserShopsAccountsModule { }
