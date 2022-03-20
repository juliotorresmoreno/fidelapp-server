import {
    Entity, Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    JoinColumn,
    ManyToOne
} from 'typeorm';
import { Shop } from './shop.entity';
import { Owner } from './user.entity';

@Entity({
    name: 'products',
    synchronize: true
})
export class Product {
    @PrimaryGeneratedColumn('increment')
    id?: number;

    @ManyToOne(() => Shop, shop => shop.name, {
        eager: false,
        nullable: false
    })
    @JoinColumn({ name: 'owner_id' })
    shop?: Shop;

    @ManyToOne(() => Owner, (user: Owner) => `${user.name} ${user.last_name}`, {
        eager: false,
        nullable: false,
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
        length: 100,
        unique: true
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
