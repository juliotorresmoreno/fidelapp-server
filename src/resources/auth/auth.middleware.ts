
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { RedisService } from 'src/components/redis/redis.service';
import { User } from 'src/entities/user.entity';
import { RequestWithSession } from 'src/types/http';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    private usersRepository: Repository<User>;

    constructor(
        private readonly connection: Connection,
        private readonly redisService: RedisService
    ) {
        this.usersRepository = this.connection.getRepository(User);
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
        const user = userId
            ? await this.usersRepository.findOne({
                select: [
                    'id',
                    'name',
                    'last_name',
                    'phone',
                    'photo_url',
                    'verified',
                    'rol'
                ],
                where: {
                    id: userId,
                    deleted_at: null
                }
            })
            : null;
        if (user) {
            await this.redisService.set(sessionKey, userId);
            req.session = user;
            req.token = token;
        }
        next();
    }
}
