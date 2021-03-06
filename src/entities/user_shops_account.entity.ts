import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ShopLite } from "./shop.entity";
import { Owner } from "./user.entity";

const tableName = 'user_shops_accounts';

@Entity(tableName, {
    synchronize: true
})
export class UserShopsAccount {
    @PrimaryGeneratedColumn('increment')
    id: number;

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
        type: 'decimal',
        precision: 2
    })
    balance: number;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    creation_at: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at: Date;
}
