import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AwsSnsService } from 'src/components/aws-sns/aws-sns.service';
import { SecureService } from 'src/components/secure/secure.service';
import { AwsSesService } from 'src/components/aws-ses/aws-ses.service';
import { RedisService } from 'src/components/redis/redis.service';

@Module({
    imports: [],
    controllers: [AuthController],
    providers: [
        AuthService,
        AwsSnsService,
        AwsSesService,
        SecureService,
        RedisService
    ]
})
export class AuthModule { }
