import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ShopLite } from "./shop.entity";
import { Owner, User } from "./user.entity";

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
    shop: ShopLite;

    @ManyToOne(() => User, (user: User) => `${user.name} ${user.last_name}`, {
        eager: false,
        nullable: false
    })
    @JoinColumn({ name: 'client_id' })
    client: User;

    @ManyToOne(() => Owner, (user: Owner) => `${user.name} ${user.last_name}`, {
        eager: false,
        nullable: false
    })
    @JoinColumn({ name: 'owner_id' })
    owner: Owner;

    @Column({
        type: 'integer',
        transformer: {
            to: (value: number) => {
                return Number.parseInt(value as any, 10);
            },
            from: (value) => {
                return Number.parseInt(value as any, 10);
            }
        }
    })
    balance: number;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    creation_at: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at: Date;

    @DeleteDateColumn({ type: 'timestamptz' })
    deleted_at?: Date;
}
