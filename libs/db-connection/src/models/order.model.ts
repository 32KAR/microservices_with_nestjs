import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Address } from './address.model';
import { Coupon } from './coupon.model';
import { User } from './users.model';
import moment = require('moment-timezone');
import { BeforeInsert, BeforeUpdate, CreateDateColumn } from 'typeorm';
import { Order_Product } from './orderProduct.model';
import { Order_History } from './orderHistory.model';

@Table
export class Order extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  user_id: number;

  @ForeignKey(() => Address)
  @AllowNull(false)
  @Column
  address_id: number;

  @ForeignKey(() => Coupon)
  @AllowNull(false)
  @Column
  coupon_id: number;

  @AllowNull(false)
  @Column
  totalAmount: number;

  @AllowNull(true)
  @Column
  tax: number;

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

  @Column({ defaultValue: 0 })
  is_deleted: boolean;

  @BelongsTo(() => Coupon)
  coupon: Coupon;

  @BelongsTo(() => Address)
  address: Address;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Order_Product, { foreignKey: 'order_id' })
  order_Product: Order_Product;

  @HasMany(() => Order_History, { foreignKey: 'order_id' })
  orderHistory: Order_History;
}
