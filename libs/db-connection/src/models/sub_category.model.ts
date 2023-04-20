import moment = require('moment');
import {
  AllowNull,
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { BeforeInsert, BeforeUpdate, CreateDateColumn } from 'typeorm';
import { Category } from './category.model';
import { Product } from './product.model';

@Table
export class Sub_category extends Model {
  @ForeignKey(() => Category)
  @AllowNull(false)
  @Column
  category_id: number;

  @AllowNull(false)
  @Column
  sub_category_name: string;

  @AllowNull(true)
  @Column
  sub_category_image: string;

  @AllowNull(true)
  @Column
  sub_category_description: string;

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

  @HasMany(() => Product, { foreignKey: 'sub_category_id' })
  product: Product;

  @BelongsTo(() => Category)
  category: Category;
}
