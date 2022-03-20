import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { Shop } from './shop.entity';

@Entity({
    name: 'users',
    synchronize: true
})
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 6 })
    validation_code: string;

    @Column({ default: false })
    verified: boolean;

    @Column({ type: 'varchar', length: 100, default: '', nullable: true })
    name: string;

    @Column({ type: 'varchar', length: 100, default: '', nullable: true })
    last_name: string;

    @Column({ type: 'varchar', length: 300, default: '', nullable: true })
    email: string;

    @Column({ type: 'varchar', length: 255, default: '', nullable: false })
    password: string;

    @Column({ type: 'varchar', length: 1000, default: '', nullable: true })
    photo_url: string;

    @Column({
        type: 'varchar',
        length: 15,
        default: '',
        unique: true
    })
    phone: string;

    @Column({
        type: 'varchar',
        length: 15,
        default: ''
    })
    rol?: 'seller' | 'client';

    @ManyToMany(() => Shop)
    @JoinTable({
        name: 'users_shops'
    })
    shops?: Shop[];

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    creation_at: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at: Date;

    @DeleteDateColumn({ type: 'timestamptz' })
    deleted_at?: Date;
}

@Entity('users', {
    synchronize: false
})
export class Owner {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ default: false })
    verified: boolean;

    @Column({ type: 'varchar', length: 100, default: '', nullable: true })
    name: string;

    @Column({ type: 'varchar', length: 100, default: '', nullable: true })
    last_name: string;

    @Column({ type: 'varchar', length: 300, default: '', nullable: true })
    email: string;

    @Column({ type: 'varchar', length: 1000, default: '', nullable: true })
    photo_url: string;

    @Column({
        type: 'varchar',
        length: 15,
        default: '',
        unique: true
    })
    phone: string;

    @Column({
        type: 'varchar',
        length: 15,
        default: ''
    })
    rol?: 'seller' | 'client';
}