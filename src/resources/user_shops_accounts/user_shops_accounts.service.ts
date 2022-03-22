
import { Injectable } from '@nestjs/common';
import * as createHttpError from 'http-errors';
import { DatabaseException } from 'src/common/exception';
import { History } from 'src/entities/history.entity';
import { Owner, Session } from 'src/entities/user.entity';
import { UserShopsAccount } from 'src/entities/user_shops_account.entity';
import { Connection, DeepPartial, FindManyOptions, Repository } from 'typeorm';
import { ProductsService } from '../products/products.service';
import { ShopService } from '../shops/shops.service';
import { AddBalanceShopDto, BuyOnShopDto } from './user_shops_accounts.dto';

@Injectable()
export class UserShopsAccountsService {
    private userShopsAccountRepository: Repository<UserShopsAccount>;

    constructor(
        private readonly connection: Connection,
        private readonly shopService: ShopService,
        private readonly productsService: ProductsService
    ) {
        this.userShopsAccountRepository = this.connection.getRepository(UserShopsAccount);
    }

    async subscribe(payload: DeepPartial<UserShopsAccount>) {
        const relation = await this.userShopsAccountRepository.findOne({
            where: {
                client: { id: payload.client.id },
                owner: { id: payload.owner.id },
                shop: { id: payload.shop.id }
            },
            relations: ['client', 'owner', 'shop']
        });
        if (!relation) {
            await this.userShopsAccountRepository.save({
                ...payload,
                client: { id: payload.client.id },
                owner: { id: payload.owner.id },
                shop: { id: payload.shop.id }
            });
            return;
        }
        if (relation.deleted_at) {
            console.log('subscribe 4', {
                id: relation.id,
                deleted_at: null
            });
            await this.userShopsAccountRepository.save({
                id: relation.id,
                deleted_at: null
            });
        }
    }

    findAll(query: FindManyOptions<UserShopsAccount> = {}) {
        return this.userShopsAccountRepository.findAndCount(query)
            .catch(() => {
                throw new DatabaseException();
            });
    }

    findOne(query: FindManyOptions<UserShopsAccount> = {}) {
        return this.userShopsAccountRepository.findOne(query)
            .catch(() => {
                throw new DatabaseException();
            });
    }

    async addBalance(payload: AddBalanceShopDto & { owner: Session }) {
        const shop = await this.shopService.findOne({
            relations: ['owner'],
            where: {
                id: payload.shop_id,
                owner: payload.owner
            }
        });
        if (!shop) throw new createHttpError.Unauthorized();

        const userShopsAccount = await this.userShopsAccountRepository.findOne({
            relations: ['client', 'shop', 'owner'],
            where: {
                client: { id: payload.client_id },
                shop: { id: payload.shop_id },
                owner: payload.owner
            }
        });
        if (!userShopsAccount) throw new createHttpError.Unauthorized();

        await this.connection.transaction(async transactionalEntityManager => {
            const balance = Number.parseInt(payload.balance as any);

            const record = new UserShopsAccount();
            record.id = userShopsAccount.id;
            record.balance = userShopsAccount.balance + balance;
            await transactionalEntityManager.save(record);

            const history = new History();
            history.type = 'addition';
            history.owner = payload.owner;
            history.quantity = 1;
            history.unitPrice = balance;
            history.total = balance;
            history.userShopsAccount = userShopsAccount;
            await transactionalEntityManager.save(history);
        });
    }

    async buy(payload: BuyOnShopDto & { client: Session }) {
        const shop = await this.shopService.findOne({
            relations: ['owner'],
            where: {
                id: payload.shop_id
            }
        });
        if (!shop) throw new createHttpError.Unauthorized();

        const userShopsAccount = await this.userShopsAccountRepository.findOne({
            relations: ['client', 'shop', 'owner'],
            where: {
                client: { id: payload.client.id },
                owner: { id: shop.owner.id },
                shop: { id: payload.shop_id }
            }
        });
        if (!userShopsAccount) throw new createHttpError.Unauthorized();

        const product = await this.productsService.findOne({
            where: {
                id: payload.product_id,
                owner: { id: shop.owner.id },
                deleted_at: null
            }
        });
        if (!product) throw new createHttpError.Unauthorized();

        await this.connection.transaction(async transactionalEntityManager => {

            const amount = product.price * payload.quantity;
            const balance = userShopsAccount.balance - amount;

            if (balance < 0) {
                throw new createHttpError.Unauthorized('Fondos insuficientes!.');
            }

            const record = new UserShopsAccount();
            record.id = userShopsAccount.id;
            record.balance = userShopsAccount.balance - amount;
            await transactionalEntityManager.save(record);

            const history = new History();
            history.type = 'subtraction';
            history.owner = shop.owner;
            history.product = product;
            history.quantity = 1;
            history.unitPrice = product.price;
            history.total = amount;
            history.userShopsAccount = userShopsAccount;
            await transactionalEntityManager.save(history);
        });
    }
}
