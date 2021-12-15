
import { Injectable } from '@nestjs/common';
import { CacheService } from 'src/types/cache.service';
import * as redis from 'redis';
import getConfig from 'src/config/configuration';

@Injectable()
export class RedisService implements CacheService {
    private redisClient: redis.RedisClient;
    private redisPub: redis.RedisClient;
    private redisSub: redis.RedisClient;

    constructor() {
        const config = getConfig();
        const clientArgs = {
            url: config.redisUrl
        };
        this.redisClient = redis.createClient(clientArgs);
        this.redisPub = redis.createClient(clientArgs);
        this.redisSub = redis.createClient(clientArgs);

        this.redisSub.on('error', function (err) {
            console.log(err);
        });
        this.redisPub.on('error', function (err) {
            console.log(err);
        });
        this.redisClient.on('error', function (err) {
            console.log(err);
        });

        this.redisClient.on('connection', function () {
            console.log('open');
        });
    }

    getClient() {
        return this.redisClient;
    }

    public async set(key: string, value: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.redisClient.set(key, value, 'EX', 60 * 60 * 24, function (err, reply) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(reply);
            });
        });
    }

    public async get(key: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.redisClient.get(key, function (err, reply) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(reply);
            });
        });
    }

    public async publish(key: string, value: string): Promise<void> {
        await this.redisClient.publish(key, value);
    }

    public async subscribe(key: string, fn: redis.Callback<string>): Promise<void> {
        this.redisClient.subscribe(key, fn);
    }
}
