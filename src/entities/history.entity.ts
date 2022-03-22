import { DatabaseException } from "src/common/exception";
import {
    BeforeInsert, BeforeUpdate,
    Column, CreateDateColumn, DeepPartial, DeleteDateColumn,
    Entity, JoinColumn, ManyToOne,
    PrimaryGeneratedColumn, UpdateDateColumn
} from "typeorm";
import { Product } from "./product.entity";
import { Owner } from "./user.entity";
import { UserShopsAccount } from "./user_shops_account.entity";

const tableName = 'history';

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
        nullable: true
    })
    @JoinColumn({ name: 'product_id' })
    product?: Product;

    @Column({
        enum: ['addition', 'subtraction']
    })
    type: 'addition' | 'subtraction';

    @Column({
        type: 'decimal'
    })
    quantity: number;

    @Column({
        type: 'decimal'
    })
    unitPrice: number;

    @Column({
        type: 'decimal'
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
            throw new DatabaseException('El monto total no es valido!.');
        }
    }
}
