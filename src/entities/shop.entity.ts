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
import { Owner } from './user.entity';

@Entity({
    name: 'shops',
    synchronize: true
})
export class Shop {
    @PrimaryGeneratedColumn('increment')
    id?: number;

    @OneToOne(() => Owner, (user: Owner) => `${user.name} ${user.last_name}`, {
        eager: false,
        nullable: false,
    })
    @JoinColumn({ name: 'owner_id' })
    owner?: Owner;

    @Column({
        type: 'varchar',
        length: 100,
        unique: true
    })
    identify: string;

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
