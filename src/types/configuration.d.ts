import { Credentials } from "aws-sdk";
import { CredentialsOptions } from "aws-sdk/lib/credentials";
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export type Configuration = {
    env: 'development' | 'production';
    port: number;
    secret: string;
    database: TypeOrmModuleOptions;
    redisUrl: string;
    baseUrl: string;
    pageSize: number;
    aws?: {
        region: string;
        credentials?: CredentialsOptions
        cognito?: {
            aws_user_pools_id: string;
            aws_cognito_region: string;
            aws_user_pools_web_client_id: string;
        },
        s3?: {
            signature_version: string;
            region?: string;
        },
        sns?: {
            region?: string;
        },
        ses: {
            default_from: string;
            region?: string;
        }
    },
    basePath: string
}
