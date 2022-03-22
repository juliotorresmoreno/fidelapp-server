
import { Injectable } from '@nestjs/common';
import { DatabaseException } from 'src/common/exception';
import { History } from 'src/entities/history.entity';
import { Connection, EntityManager, FindManyOptions, Repository, Transaction, TransactionManager } from 'typeorm';

@Injectable()
export class HistoryService {
    private historyRepository: Repository<History>;

    constructor(private readonly connection: Connection) {
        this.historyRepository = this.connection.getRepository(History);
    }

    @Transaction()
    create(@TransactionManager() manager: EntityManager, payload: History) {
        return manager.save(payload)
            .catch((err) => {
                throw new DatabaseException();
            });
    }

    findAll(query: FindManyOptions<History> = {}) {
        return this.historyRepository.findAndCount(query)
            .catch((err) => {
                throw new DatabaseException();
            });
    }

    findOne(query: FindManyOptions<History> = {}) {
        return this.historyRepository.findOne(query)
            .catch((err) => {
                throw new DatabaseException();
            });
    }
}
