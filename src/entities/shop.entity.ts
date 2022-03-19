import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    JoinColumn,
    OneToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Owner, User } from './user.entity';

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
    @OneToOne(() => Owner, (user: Owner) => `${user.name} ${user.last_name}`, {
        eager: false,
        nullable: false,
    })
    @JoinColumn({ name: 'owner_id' })
    owner?: Owner;

    @ApiProperty({
        description: 'code parameter uppercase',
        example: 'CODE',
    })
    @Column({
        type: 'varchar',
        length: 100,
        unique: true
    })
    identify: string;

    @ApiProperty({
        description: 'code parameter uppercase',
        example: 'CODE',
    })
    @Column({
        type: 'varchar',
        length: 100,
        unique: true
    })
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
