import {
    Entity, Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    JoinColumn,
    ManyToOne
} from 'typeorm';
import { ShopLite } from './shop.entity';
import { Owner } from './user.entity';

@Entity({
    name: 'products',
    synchronize: true
})
export class Product {
    @PrimaryGeneratedColumn('increment')
    id?: number;

    @ManyToOne(() => ShopLite, shop => shop.name, {
        eager: false,
        nullable: false
    })
    @JoinColumn({ name: 'shop_id' })
    shop?: ShopLite;

    @ManyToOne(() => Owner, (user: Owner) => `${user.name} ${user.last_name}`, {
        eager: false,
        nullable: false
    })
    @JoinColumn({ name: 'owner_id' })
    owner?: Owner;

    @Column({
        type: 'varchar',
        length: 100
    })
    sku: string;

    @Column({
        type: 'varchar',
        length: 100
    })
    name: string;

    @Column({ type: 'varchar', length: 350 })
    description: string;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    creation_at?: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at?: Date;

    @DeleteDateColumn({ type: 'timestamptz' })
    deleted_at?: Date;
}

@Entity({
    name: 'products',
    synchronize: false
})
export class ProductLite {
    @PrimaryGeneratedColumn('increment')
    id?: number;

    @ManyToOne(() => ShopLite, shop => shop.name, {
        eager: false,
        nullable: false
    })
    @JoinColumn({ name: 'shop_id' })
    shop?: ShopLite;

    @Column({ name: 'shop_id' })
    shop_id?: number;

    @ManyToOne(() => Owner, (user: Owner) => `${user.name} ${user.last_name}`, {
        eager: false,
        nullable: false,
    })
    @JoinColumn({ name: 'owner_id' })
    owner?: Owner;

    @Column()
    sku: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    deleted_at?: Date;
}

