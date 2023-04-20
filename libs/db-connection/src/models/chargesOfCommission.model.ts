import {
  AllowNull,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { BeforeInsert, BeforeUpdate, CreateDateColumn } from 'typeorm';
import { Commission } from './commission.model';
import { Product } from './product.model';
import { Store } from './store.model';
import { User } from './users.model';
import moment = require('moment-timezone');

@Table
export class Charges_of_commission extends Model {
  @ForeignKey(() => Commission)
  @AllowNull(false)
  @Column
  commission_id: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  user_id: number;

  @ForeignKey(() => Store)
  @AllowNull(false)
  @Column
  store_id: number;

  @ForeignKey(() => Product)
  @AllowNull(false)
  @Column
  product_id: number;

  @AllowNull(false)
  @Column
  totalCommission: number;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  insertCreated() {
    this.created_at = new Date(
      moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss')
    );
    this.updated_at = new Date(
      moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss')
    );
  }

  @BeforeUpdate()
  insertUpdated() {
    this.updated_at = new Date(
      moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss')
    );
  }

  @BelongsTo(() => Product)
  product: Product;

  @BelongsTo(() => Store)
  store: Store;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Commission)
  commission: Commission;
}
