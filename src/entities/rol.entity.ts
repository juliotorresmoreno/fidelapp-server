import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('roles')
export class Rol {
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
