
import { Injectable } from '@nestjs/common';
import * as createHttpError from 'http-errors';
import { DatabaseException } from 'src/common/exception';
import { Shop } from 'src/entities/shop.entity';
import { Session } from 'src/entities/user.entity';
import { Connection, FindConditions, FindManyOptions, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class ShopService {
    private shopsRepository: Repository<Shop>;

    constructor(private readonly connection: Connection) {
        this.shopsRepository = this.connection.getRepository(Shop);
    }

    create(payload: Shop | { owner: Session }) {
        return this.shopsRepository.save(payload)
            .catch(err => {
                if (err.routine === '_bt_check_unique') {
                    throw new createHttpError.BadRequest('Usted ya tiene una tienda registrada!');
                }
            });
    }

    findAll(query: FindManyOptions<Shop> = {}) {
        return this.shopsRepository.findAndCount(query)
            .catch((err) => {
                console.trace(err);
                throw new DatabaseException();
            });
    }

    findOne(query: FindManyOptions<Shop> = {}) {
        return this.shopsRepository.findOne(query)
            .catch((err) => {
                console.trace(err);
                throw new DatabaseException();
            });
    }

    update(conditions: FindConditions<Shop>, payload: QueryDeepPartialEntity<Shop>) {
        return this.shopsRepository.update(conditions, payload)
            .then(() => this.findOne({
                where: conditions
            }))
            .catch((err) => {
                console.trace(err);
                throw new DatabaseException();
            });
    }

    remove(conditions: FindConditions<Shop>) {
        return this.shopsRepository.softDelete(conditions)
            .catch((err) => {
                console.trace(err);
                throw new DatabaseException();
            });
    }
}
