import { DatabaseException } from "src/common/exception";
import {
    BeforeInsert, BeforeUpdate,
    Column, CreateDateColumn, DeleteDateColumn,
    Entity, JoinColumn, ManyToOne,
    PrimaryGeneratedColumn, UpdateDateColumn
} from "typeorm";
import { Product } from "./product.entity";
import { Owner } from "./user.entity";
import { UserShopsAccount } from "./user_shops_account.entity";

const tableName = 'user_shops_accounts';

@Entity(tableName, {
    synchronize: true
})
export class History {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => Owner, (user: Owner) => `${user.name} ${user.last_name}`, {
        eager: false,
        nullable: false
    })
    @JoinColumn({ name: 'owner_id' })
    owner?: Owner;

    @ManyToOne(() => UserShopsAccount, {
        eager: false,
        nullable: false
    })
    @JoinColumn({ name: 'user_shops_account_id' })
    userShopsAccount?: UserShopsAccount;

    @ManyToOne(() => Product, {
        eager: false,
        nullable: false
    })
    @JoinColumn({ name: 'product_id' })
    product?: Product;

    @Column({
        type: 'decimal',
        precision: 2
    })
    quantity: number;

    @Column({
        type: 'decimal',
        precision: 2
    })
    unitPrice: number;

    @Column({
        type: 'decimal',
        precision: 2
    })
    total: number;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    creation_at: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at: Date;

    @DeleteDateColumn({ type: 'timestamptz' })
    deleted_at?: Date;

    @BeforeInsert()
    @BeforeUpdate()
    validate() {
        if (this.unitPrice * this.quantity !== this.total) {
            throw new DatabaseException(null, 'El monto total no es valido!.');
        }
    }
}
