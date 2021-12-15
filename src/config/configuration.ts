
import * as path from "path";
import { Rol } from "src/entities/rol.entity";
import { Shop } from "src/entities/shop.entity";
import { User } from "src/entities/user.entity";
import { Configuration } from "src/types/configuration";

export default function getConfig(): Configuration {
    const env = ['development', 'production'].includes(process.env.NODE_ENV)
        ? process.env.NODE_ENV as any
        : 'development';
    return {
        env: env,
        port: Number.parseInt(process.env.PORT) || 5000,
        secret: process.env.SECRET,
        redisUrl: process.env.REDIS_URL,
        baseUrl: process.env.BASE_URL,
        database: {
            type: process.env.DATABASE_DRIVER as any,
            host: process.env.DATABASE_HOST || 'localhost',
            port: Number(process.env.DATABASE_PORT) || 5432,
            username: process.env.DATABASE_USER || '',
            password: process.env.DATABASE_PASSWORD || '',
            database: process.env.DATABASE_NAME || '',
            synchronize: process.env.DATABASE_SYNC === 'true',
            
            entities: [Rol, User, Shop]
        },
        aws: {
            region: process.env.AWS_DEFAULT_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRECT_ACCESS_KEY,
            },
            ses: {
                default_from: process.env.AWS_SES_DEFAULT_FROM
            }
        },
        basePath: path.join(__dirname, '..', '..')
    }
};
