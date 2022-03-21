
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { RedisService } from 'src/components/redis/redis.service';
import { Session } from 'src/entities/user.entity';
import { RequestWithSession } from 'src/types/http';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    private usersRepository: Repository<Session>;

    constructor(
        private readonly connection: Connection,
        private readonly redisService: RedisService
    ) {
        this.usersRepository = this.connection.getRepository(Session);
    }

    async use(req: RequestWithSession, res: Response, next: NextFunction) {
        let token = req.headers.authorization || req.query.authorization;
        if (typeof token !== 'string') {
            next();
            return;
        }
        token = token.substring(0, 6) === 'Bearer'
            ? token.substring(7)
            : token;
        const sessionKey = `session:${token}`;
        const userId = await this.redisService.get(sessionKey);
        const session = userId
            ? await this.usersRepository.findOne({
                where: {
                    id: userId,
                    deleted_at: null
                }
            })
            : null;
        if (session) {
            await this.redisService.set(sessionKey, userId);
            req.session = session;
            req.token = token;
        }
        next();
    }
}
