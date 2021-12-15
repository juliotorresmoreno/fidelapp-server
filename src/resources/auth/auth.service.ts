
import { Injectable, UnauthorizedException } from '@nestjs/common';
import getL18N from 'src/l18n/l18n.lang';
import * as randomstring from 'randomstring';
import { SignInDto, SignUpDto, VerificationCodeDto } from './auth.dto';
import { Connection, Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { Rol } from 'src/entities/rol.entity';
import { SecureService } from 'src/components/secure/secure.service';
import * as crypto from 'crypto';
import { AwsSnsService } from 'src/components/aws-sns/aws-sns.service';
import { AwsSesService } from 'src/components/aws-ses/aws-ses.service';
import { EmailEventSignUp } from 'src/common/events';
import { RedisService } from 'src/components/redis/redis.service';
import { Roles } from 'src/types/roles';

@Injectable()
export class AuthService {
    private usersRepository: Repository<User>;
    private rolesRepository: Repository<Rol>;

    constructor(
        private readonly connection: Connection,
        private readonly secureService: SecureService,
        private readonly awsSnsService: AwsSnsService,
        private readonly awsSesService: AwsSesService,
        private readonly redisService: RedisService
    ) {
        this.usersRepository = this.connection.getRepository(User);
        this.rolesRepository = this.connection.getRepository(Rol);
    }

    async getOrCreateUserRol(rol: Roles) {
        let _rol = await this.rolesRepository.findOne({
            cache: true,
            where: { name: rol }
        });
        if (_rol) return _rol;
        _rol = await this.rolesRepository.save({
            name: rol,
            description: ''
        });
        return _rol;
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

    async signIn(payload: SignInDto) {
        const l18n = getL18N('ES');

        const exists = await this.usersRepository.findOne({
            email: payload.email
        });
        if (!exists) throw new UnauthorizedException();
        await this.verify(payload.password, exists.password)
            .then(result => {
                if (!result) throw new UnauthorizedException();
            })
            .catch((err) => {
                if (err instanceof UnauthorizedException)
                    throw err;
                throw new UnauthorizedException();
            });

        const sessionToken = await this.generateSessionToken(exists);

        const result = await this.usersRepository.findOne({ id: exists.id }, {
            relations: ['rol'],
            cache: true,
            select: ['id', 'name', 'last_name', 'phone', 'photo_url']
        });
        if (!result) return;
        return {
            ...result,
            token: sessionToken,
            rol: {
                id: result.rol?.id,
                name: result.rol?.name
            }
        };
    }

    async signUp(payload: SignUpDto) {
        const l18n = getL18N('ES');

        const validation_code = await this.generateRandomString(6);
        payload.password = await this.hash(payload.password);
        const rolGestor = await this.getOrCreateUserRol(Roles.GESTOR);
        const record = await this.usersRepository.save({
            ...payload,
            rol: rolGestor,
            validation_code
        });

        const emailEventSignUp = new EmailEventSignUp({
            name: record.name,
            last_name: record.last_name,
            code: validation_code
        });
        this.awsSesService.sendEMAIL(
            record.email,
            emailEventSignUp.subject,
            emailEventSignUp.contentHTML
        );

        const sessionToken = await this.generateSessionToken(record);

        if (!record) return;
        const result = await this.usersRepository.findOne({
            relations: ['rol'],
            select: [
                'id',
                'name',
                'last_name',
                'email',
                'phone',
                'photo_url',
                'verified',
                'rol'
            ],
            where: {
                id: record.id
            }
        });
        return {
            ...result,
            token: sessionToken,
            rol: {
                id: result.rol?.id,
                name: result.rol?.name
            }
        };
    }

    async verificationCode(payload: VerificationCodeDto) {
        if (!payload.email && !payload.phone)
            throw new UnauthorizedException();
        const query = payload.email
            ? { email: payload.email }
            : { phone: payload.phone };
        const exists = await this.usersRepository.findOne({
            ...query,
            validation_code: payload.code,
            deleted_at: null
        });
        if (!exists) return;

        await this.usersRepository.update({ id: exists.id }, {
            validation_code: '',
            verified: true
        });
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
