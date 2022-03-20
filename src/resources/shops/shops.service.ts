
import { Injectable } from '@nestjs/common';
import { DatabaseException } from 'src/common/exception';
import { Shop } from 'src/entities/shop.entity';
import { User } from 'src/entities/user.entity';
import { Connection, FindCondition, FindConditions, FindManyOptions, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class ShopService {
    private shopsRepository: Repository<Shop>;

    constructor(private readonly connection: Connection) {
        this.shopsRepository = this.connection.getRepository(Shop);
    }

    create(session: User, createShopDto: Shop | { owner?: User }) {
        return this.shopsRepository.save({
            ...createShopDto,
            owner: session
        });
    }

    findAll(query: FindManyOptions<Shop> = {}) {
        return this.shopsRepository.findAndCount(query)
            .catch(() => {
                throw new DatabaseException();
            });
    }

    findOne(query: FindManyOptions<Shop> = {}) {
        return this.shopsRepository.findOne(query)
            .catch(() => {
                throw new DatabaseException();
            });
    }

    update(conditions: FindConditions<Shop>, updateShopDto: QueryDeepPartialEntity<Shop>) {
        return this.shopsRepository.update(conditions, updateShopDto)
            .then(() => this.findOne({
                where: conditions
            }))
            .catch(() => {
                throw new DatabaseException();
            });
    }

    remove(conditions: FindConditions<Shop>) {
        return this.shopsRepository.softDelete(conditions)
            .catch(() => {
                throw new DatabaseException();
            });
    }
}
