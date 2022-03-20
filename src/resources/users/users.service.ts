
import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { Connection, Repository } from 'typeorm';
import { RegisterShopDto, UpdateProfileDto } from './users.dto';

@Injectable()
export class UsersService {
    private usersRepository: Repository<User>;

    constructor(private readonly connection: Connection) {
        this.usersRepository = this.connection.getRepository(User);
    }

    async updateProfile(id: number, payload: UpdateProfileDto) {
        this.usersRepository.update({ id }, payload);
    }

    async registerShop(id: number, payload: RegisterShopDto) {
        const user = await this.usersRepository.findOne({
            select: [
                'id',
            ],
            where: { id, deleted_at: null },
            relations: ['shops']
        });
        await this.usersRepository.save({
            id,
            shops: [
                ...(user.shops || []),
                { id: payload.shop_id }
            ]
        });
    }
}
