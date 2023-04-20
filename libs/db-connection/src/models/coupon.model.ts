import { DataTypes } from 'sequelize';
import {
  Column,
  Model,
  Table,
  AutoIncrement,
  PrimaryKey,
  Unique,
  ForeignKey,
  BelongsTo,
  AllowNull,
} from 'sequelize-typescript';
import { CreateDateColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import moment = require('moment-timezone');
import { Admin } from './admin.model';

@Table
export class Coupon extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Admin)
  @AllowNull(false)
  @Column
  user_id: number;

  @AllowNull(false)
  @Column
  coupon_name: string;

  @Unique
  @AllowNull(false)
  @Column
  coupon_code: string;

  @AllowNull(false)
  @Column
  discount: number;

  @AllowNull(true)
  @Column
  coupon_use: number;

  @AllowNull(false)
  @Column({ type: DataTypes.DATEONLY })
  valid_from: Date;

  @AllowNull(false)
  @Column({ type: DataTypes.DATEONLY })
  valid_till: Date;

  @AllowNull(false)
  @Column({ defaultValue: 1 })
  discount_upto: number;

  @AllowNull(false)
  @Column
  description: string;

  @AllowNull(false)
  @Column
  min_purchase_amount: number;

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

  @BelongsTo(() => Admin)
  admin: Admin;
}
