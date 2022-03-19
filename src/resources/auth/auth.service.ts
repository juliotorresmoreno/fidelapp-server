
import { Injectable } from '@nestjs/common';
import getL18N from 'src/l18n/l18n.lang';
import * as randomstring from 'randomstring';
import { PhoneSignInDto, SignInDto, SignUpDto, VerificationCodeDto } from './auth.dto';
import { Connection, Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { SecureService } from 'src/components/secure/secure.service';
import * as crypto from 'crypto';
import { AwsSnsService } from 'src/components/aws-sns/aws-sns.service';
import { AwsSesService } from 'src/components/aws-ses/aws-ses.service';
import { EmailEventSignUp } from 'src/common/events';
import { RedisService } from 'src/components/redis/redis.service';
import * as createHttpError from 'http-errors';
import { RequestWithSession } from 'src/types/http';

@Injectable()
export class AuthService {
    private l18n = getL18N('ES');
    private usersRepository: Repository<User>;

    constructor(
        private readonly connection: Connection,
        private readonly secureService: SecureService,
        private readonly awsSnsService: AwsSnsService,
        private readonly awsSesService: AwsSesService,
        private readonly redisService: RedisService
    ) {
        this.usersRepository = this.connection.getRepository(User);
    }

    async hash(password: string) {
        return new Promise<string>((resolve, reject) => {
            const salt = crypto.randomBytes(16).toString("hex")

            crypto.scrypt(password, salt, 64, (err, derivedKey) => {
                if (err) reject(err);
                resolve(salt + ":" + derivedKey.toString('hex'))
            });
        })
    }

    async verify(password: string, hash: string) {
        return new Promise<boolean>((resolve, reject) => {
            const [salt, key] = hash.split(":")
            crypto.scrypt(password, salt, 64, (err, derivedKey) => {
                if (err) reject(err);
                resolve(key == derivedKey.toString('hex'))
            });
        })
    }

    async phoneSignIn(payload: PhoneSignInDto) {
        let exists = await this.usersRepository.findOne({
            phone: payload.phone
        });
        const validation_code = await this.generateRandomString(6);
        if (!exists) {
            await this.usersRepository.save({
                phone: payload.phone,
                validation_code,
                verified: false
            });
            exists = await this.usersRepository.findOne({
                phone: payload.phone
            });
        } else {
            await this.usersRepository.update({ id: exists.id }, {
                validation_code: validation_code,
                verified: true
            });
        }

        const message = this.l18n.sms.accountValidation(validation_code);
        await this.awsSnsService.sendSMS(payload.phone, message)
            .catch(err => {
                throw new createHttpError.InternalServerError('No fue posible enviar el sms');
            });
    }

    async verificationCode(payload: VerificationCodeDto) {
        if (!payload.email && !payload.phone)
            throw new createHttpError.Unauthorized();
        const query = payload.email
            ? { email: payload.email }
            : { phone: payload.phone };
        const exists = await this.usersRepository.findOne({
            ...query,
            validation_code: payload.code,
            deleted_at: null
        });
        if (!exists) {
            throw new createHttpError.Unauthorized();
        };

        await this.usersRepository.update({ id: exists.id }, {
            validation_code: '',
            verified: true
        });

        const sessionToken = await this.generateSessionToken(exists);

        return this.getSession(exists.id, sessionToken);
    }

    async getSession(id: number, sessionToken: string) {
        const session = await this.usersRepository.findOne(id, {
            select: [
                'id', 'name', 'last_name', 'email', 'photo_url', 'rol'
            ]
        });
        return {
            ...session,
            token: sessionToken
        }
    }

    async generateSessionToken(user: User) {
        const token = await this.generateRandomString(128);
        await this.redisService.set(`session:${token}`, user.id.toString());
        return token;
    }

    async generateRandomString(length: number): Promise<string> {
        return randomstring.generate({ length });
    }
}
