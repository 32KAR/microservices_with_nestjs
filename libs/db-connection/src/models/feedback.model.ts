import {
  AllowNull,
  BelongsTo,
  Column,
  ForeignKey,
  Max,
  Min,
  Model,
  Table,
} from 'sequelize-typescript';
import { Product } from './product.model';
import { User } from './users.model';
import moment = require('moment-timezone');
import { BeforeInsert, BeforeUpdate, CreateDateColumn } from 'typeorm';

@Table
export class Feedback extends Model {
  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  user_id: number;

  @ForeignKey(() => Product)
  @AllowNull(false)
  @Column
  product_id: number;

  @AllowNull(true)
  @Max(5)
  @Min(0)
  @Column
  rating: number;

  @AllowNull(true)
  @Column
  review: string;

  @AllowNull(true)
  @Column({ defaultValue: 0 })
  liked: boolean;

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

  @BelongsTo(() => Product)
  product: Product;

  @BelongsTo(() => User)
  user: User;
}
