
import { Injectable } from '@nestjs/common';
import { DatabaseException } from 'src/common/exception';
import { Shop } from 'src/entities/shop.entity';
import { User } from 'src/entities/user.entity';
import { Connection, FindManyOptions, Repository } from 'typeorm';
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

    findOne(session: User, id: number) {
        const select = ['id', 'name', 'description', 'creation_at', 'updated_at'];
        return this.shopsRepository.createQueryBuilder('shop')
            .select(select.map(col => `shop.${col}`))
            .where({
                id,
                owner: { id: session.id },
                deleted_at: null
            })
            .getOne()
            .catch(() => {
                throw new DatabaseException();
            });
    }

    update(session: User, id: number, updateShopDto: QueryDeepPartialEntity<Shop>) {
        return this.shopsRepository.update({
            id,
            owner: { id: session.id }
        }, updateShopDto)
            .then(() => this.findOne(session, id))
            .catch(() => {
                throw new DatabaseException();
            });
    }

    remove(session: User, id: number) {
        return this.shopsRepository.softDelete({
            id,
            owner: { id: session.id }
        })
            .catch(() => {
                throw new DatabaseException();
            });
    }
}
