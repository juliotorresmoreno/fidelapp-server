import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    JoinColumn,
    ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';

@Entity('shops')
export class Shop {
    @ApiProperty({
        description: 'code parameter uppercase',
        example: 'CODE',
    })
    @PrimaryGeneratedColumn('increment')
    id?: number;

    @ApiProperty({
        description: 'code parameter uppercase',
        example: 'CODE',
    })
    @ManyToOne(() => User, (user: User) => `${user.name} ${user.last_name}`, {
        eager: true,
        nullable: false
    })
    @JoinColumn({ name: 'owner_id' })
    owner?: User;

    @ApiProperty({
        description: 'code parameter uppercase',
        example: 'CODE',
    })
    @Column({ type: 'varchar', length: 100 })
    name: string;

    @ApiProperty({
        description: 'code parameter uppercase',
        example: 'CODE',
    })
    @Column({ type: 'varchar', length: 350 })
    description: string;

    @ApiProperty({
        description: 'code parameter uppercase',
        example: 'CODE',
    })
    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    creation_at?: Date;

    @ApiProperty({
        description: 'code parameter uppercase',
        example: 'CODE',
    })
    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at?: Date;

    @ApiProperty({
        description: 'code parameter uppercase',
        example: 'CODE',
    })
    @DeleteDateColumn({ type: 'timestamptz' })
    deleted_at?: Date;
}
