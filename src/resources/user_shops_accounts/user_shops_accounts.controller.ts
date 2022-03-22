
import { Body, Controller, Get, Post, Request, UsePipes } from '@nestjs/common';
import { JoiValidationPipe } from 'src/pipes/joiValidationPipe';
import { RequestWithSession } from 'src/types/http';
import { Authentication } from 'src/utils/secure';
import { ShopService } from '../shops/shops.service';
import { addBalanceShopSchema, buyOnShopSchema, subscribeShopSchema } from './joiSchema';
import { AddBalanceShopDto, BuyOnShopDto, RegisterShopDto } from './user_shops_accounts.dto';
import { UserShopsAccountsService } from './user_shops_accounts.service';

@Controller('user-shops-accounts')
export class UserShopsAccountsController {
    constructor(
        private readonly userShopsAccountsService: UserShopsAccountsService,
        private readonly shopService: ShopService
    ) { }

    @Post('subscribe')
    @UsePipes(new JoiValidationPipe(subscribeShopSchema))
    @Authentication('client', 'seller')
    async subscribe(
        @Request() { session }: RequestWithSession,
        @Body() payload: RegisterShopDto
    ) {
        const shop = await this.shopService.findOne({
            relations: ['owner'],
            where: {
                id: payload.shop_id,
                deleted_at: null,
                owner: {
                    deleted_at: null
                }
            }
        });
        return this.userShopsAccountsService.subscribe({
            client: session,
            owner: shop.owner,
            shop: shop,
            balance: 0
        });
    }

    @Get('clients')
    @Authentication('seller')
    getClients(@Request() { session }: RequestWithSession) {
        return this.userShopsAccountsService.findAll({
            where: {
                owner: session
            }
        });
    }

    @Post('add-balance')
    @UsePipes(new JoiValidationPipe(addBalanceShopSchema))
    @Authentication('seller')
    async addBalance(@Request() { session }: RequestWithSession, @Body() payload: AddBalanceShopDto) {
        return this.userShopsAccountsService.addBalance({
            ...payload, 
            owner: session
        });
    }

    @Post('buy')
    @UsePipes(new JoiValidationPipe(buyOnShopSchema))
    @Authentication('seller')
    async buy(@Request() { session }: RequestWithSession, @Body() payload: BuyOnShopDto) {
        return this.userShopsAccountsService.buy({
            ...payload, 
            client: session
        });
    }
}
