
import { Injectable } from '@nestjs/common';
import { DatabaseException } from 'src/common/exception';
import { Product, ProductLite } from 'src/entities/product.entity';
import { Connection, FindConditions, FindManyOptions, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class ProductsService {
    private productsRepository: Repository<ProductLite>;

    constructor(private readonly connection: Connection) {
        this.productsRepository = this.connection.getRepository(ProductLite);
    }

    create(payload: Product) {
        return this.productsRepository.save(payload).then(() => void(0));
    }

    findAll(query: FindManyOptions<ProductLite> = {}) {
        return this.productsRepository.findAndCount(query)
            .catch(() => {
                throw new DatabaseException();
            });
    }

    findOne(query: FindManyOptions<ProductLite> = {}) {
        return this.productsRepository.findOne(query)
            .catch(() => {
                throw new DatabaseException();
            });
    }

    update(conditions: FindConditions<Product>, payload: QueryDeepPartialEntity<Product>) {
        return this.productsRepository.update(conditions, payload)
            .then(() => this.findOne({
                where: conditions
            }))
            .catch(() => {
                throw new DatabaseException();
            });
    }

    remove(conditions: FindConditions<Product>) {
        return this.productsRepository.softDelete(conditions)
            .catch(() => {
                throw new DatabaseException();
            });
    }
}
