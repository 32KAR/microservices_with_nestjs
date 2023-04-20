import {
  AllowNull,
  BelongsTo,
  Column,
  CreatedAt,
  Default,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Master_issues } from './master-issues.model';
import { User } from './users.model';
import moment = require('moment-timezone');
import {
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from './order.model';

@Table
export class Support extends Model {
  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  user_id: number;

  @ForeignKey(() => Order)
  @AllowNull(false)
  @Column
  order_id: number;

  @AllowNull(false)
  @Column
  message: string;

  @AllowNull(false)
  @Default(moment().format('YYYY-MM-DD h:mm:ss'))
  @CreatedAt
  @Column
  dateOfRequest: Date;

  @AllowNull(false)
  @Column({ defaultValue: 2 })
  status: number;

  @ForeignKey(() => Master_issues)
  @AllowNull(false)
  @Column
  related_to: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
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

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Master_issues)
  master_issues: Master_issues;

  @BelongsTo(() => Order)
  order: Order;
}
