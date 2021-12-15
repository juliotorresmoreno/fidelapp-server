import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Rol } from './rol.entity';

@Entity('users')
export class User {
    @ApiProperty({
        description: `User's identifier`,
        example: '7bbdad75-c597-4407-b3c2-5e6e853bd7f4',
    })
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ApiProperty({
        description: 'Validation code',
        example: '048245',
    })
    @Column({ type: 'varchar', length: 6 })
    validation_code: string;

    @ApiProperty({
        description: 'verified',
        example: 'boolean',
    })
    @Column({ default: false })
    verified: boolean;

    @ApiProperty({
        description: 'Name of user',
        example: 'Pedro',
    })
    @Column({ type: 'varchar', length: 100, default: '', nullable: true })
    name: string;

    @ApiProperty({
        description: 'Lastname of user',
        example: 'Fernandez',
    })
    @Column({ type: 'varchar', length: 100, default: '', nullable: true })
    last_name: string;

    @ApiProperty({
        description: 'Email of user',
        example: 'pepe.fernandez@gmail.com',
    })
    @Column({ type: 'varchar', length: 300, default: '', nullable: true })
    email: string;

    @ApiProperty({
        description: 'Password of user',
        example: '12345678',
    })
    @Column({ type: 'varchar', length: 255, default: '', nullable: false })
    password: string;

    @ApiProperty({
        description: `Url of s3 user's lawyer Rut`,
        example: 'https://s3.aws.com/assets/rutlawyer.pdf',
    })
    @Column({ type: 'varchar', length: 1000, default: '', nullable: true })
    photo_url: string;

    @ApiProperty({
        description: `User's phone`,
        example: '+573005555555',
    })
    @Column({
        type: 'varchar',
        length: 15,
        default: '',
        unique: true
    })
    phone: string;

    @ApiProperty({
        description: 'Identifier of user rol',
        example: '1',
    })
    @ManyToOne(() => Rol, (rol: Rol) => rol.name, {
        eager: true,
    })
    @JoinColumn({ name: 'rol_id' })
    rol?: Rol;

    @ApiProperty({
        description: 'code parameter uppercase',
        example: 'CODE',
    })
    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    creation_at: Date;

    @ApiProperty({
        description: 'code parameter uppercase',
        example: 'CODE',
    })
    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at: Date;

    @ApiProperty({
        description: 'code parameter uppercase',
        example: 'CODE',
    })
    @DeleteDateColumn({ type: 'timestamptz' })
    deleted_at?: Date;
}
